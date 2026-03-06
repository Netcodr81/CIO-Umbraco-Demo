using System.Text;
using System.Text.Json;
using Umbraco.Forms.Core;
using Umbraco.Forms.Core.Attributes;
using Umbraco.Forms.Core.Enums;

namespace CIO_Umbraco_Demo.Workflows;

public class WebApiRequestWorkflow : WorkflowType
{
    private readonly IHttpClientFactory _httpClientFactory;

    [Setting("API Endpoint",
        Description = "The full URL of the API endpoint (e.g., https://api.example.com/submit)",
        View = "TextField")]
    public string ApiEndpoint { get; set; } = string.Empty;

    [Setting("API Key",
        Description = "Optional API key for authentication (will be sent as Bearer token)",
        View = "TextField")]
    public string ApiKey { get; set; } = string.Empty;

    [Setting("HTTP Method",
        Description = "The HTTP method to use (POST, PUT, etc.)",
        View = "TextField")]
    public string HttpMethod { get; set; } = "POST";

    [Setting("Payload Template",
        Description = "JSON payload template. Use {fieldAlias} to include form field values. Example: {\"name\": \"{firstName}\", \"email\": \"{email}\"}",
        View = "TextArea")]
    public string PayloadTemplate { get; set; } = string.Empty;

    [Setting("Custom Headers",
        Description = "Optional custom headers in JSON format. Example: {\"Content-Type\": \"application/json\", \"X-Custom-Header\": \"value\"}",
        View = "TextArea")]
    public string CustomHeaders { get; set; } = string.Empty;

    [Setting("Timeout (seconds)",
        Description = "Request timeout in seconds (default: 30)",
        View = "TextField")]
    public string TimeoutSeconds { get; set; } = "30";

    public WebApiRequestWorkflow(IHttpClientFactory httpClientFactory)
    {
        _httpClientFactory = httpClientFactory;
        this.Name = "Web API Request";
        this.Id = new Guid("95eee49a-8660-47f7-8e7b-4811cd227ec6");
        this.Description = "Send form data to an external API endpoint.";
        this.Icon = "icon-globe";
        this.Group = "Services";
    }

    public override async Task<WorkflowExecutionStatus> ExecuteAsync(WorkflowExecutionContext context)
    {
        try
        {
            // Validate that we have an endpoint
            if (string.IsNullOrWhiteSpace(ApiEndpoint))
            {
                return WorkflowExecutionStatus.Failed;
            }

            // Build the payload by replacing field placeholders with actual values
            var payload = BuildPayload(context);

            // Create HTTP client
            using var httpClient = _httpClientFactory.CreateClient();

            // Set timeout
            if (int.TryParse(TimeoutSeconds, out int timeout) && timeout > 0)
            {
                httpClient.Timeout = TimeSpan.FromSeconds(timeout);
            }

            // Add authentication header if API key is provided
            if (!string.IsNullOrWhiteSpace(ApiKey))
            {
                httpClient.DefaultRequestHeaders.Add("X-API-KEY", ApiKey);
            }

            // Add custom headers if provided
            if (!string.IsNullOrWhiteSpace(CustomHeaders))
            {
                try
                {
                    var headers = JsonSerializer.Deserialize<Dictionary<string, string>>(CustomHeaders);
                    if (headers != null)
                    {
                        foreach (var header in headers)
                        {
                            httpClient.DefaultRequestHeaders.Add(header.Key, header.Value);
                        }
                    }
                }
                catch
                {
                    // Log warning but continue
                }
            }

            // Create request
            var request = new HttpRequestMessage
            {
                Method = new HttpMethod(HttpMethod.ToUpper()),
                RequestUri = new Uri(ApiEndpoint),
                Content = new StringContent(payload, Encoding.UTF8, "application/json")
            };

            // Send request
            var response = await httpClient.SendAsync(request);

            // Check if successful
            if (response.IsSuccessStatusCode)
            {
                return WorkflowExecutionStatus.Completed;
            }
            else
            {
                // Log the error response
                var errorContent = await response.Content.ReadAsStringAsync();
                // TODO: Log the error - response.StatusCode, errorContent
                return WorkflowExecutionStatus.Failed;
            }
        }
        catch (Exception ex)
        {
            // TODO: Log the exception
            return WorkflowExecutionStatus.Failed;
        }
    }

    public override List<Exception> ValidateSettings()
    {
        var exceptions = new List<Exception>();

        // Validate API Endpoint
        if (string.IsNullOrWhiteSpace(ApiEndpoint))
        {
            exceptions.Add(new Exception("API Endpoint is required."));
        }
        else if (!Uri.TryCreate(ApiEndpoint, UriKind.Absolute, out var uri) ||
                 (uri.Scheme != Uri.UriSchemeHttp && uri.Scheme != Uri.UriSchemeHttps))
        {
            exceptions.Add(new Exception("API Endpoint must be a valid HTTP or HTTPS URL."));
        }

        // Validate HTTP Method
        if (string.IsNullOrWhiteSpace(HttpMethod))
        {
            exceptions.Add(new Exception("HTTP Method is required."));
        }
        else
        {
            var validMethods = new[] { "GET", "POST", "PUT", "PATCH", "DELETE" };
            if (!validMethods.Contains(HttpMethod.ToUpper()))
            {
                exceptions.Add(new Exception("HTTP Method must be one of: GET, POST, PUT, PATCH, DELETE."));
            }
        }

        // Validate Payload Template (should be valid JSON if provided)
        if (!string.IsNullOrWhiteSpace(PayloadTemplate))
        {
            try
            {
                // Try to parse as JSON (with placeholders it might fail, so we just do basic check)
                if (!PayloadTemplate.Trim().StartsWith("{") && !PayloadTemplate.Trim().StartsWith("["))
                {
                    exceptions.Add(new Exception("Payload Template should be valid JSON format."));
                }
            }
            catch
            {
                exceptions.Add(new Exception("Payload Template is not valid JSON."));
            }
        }

        // Validate Custom Headers (should be valid JSON if provided)
        if (!string.IsNullOrWhiteSpace(CustomHeaders))
        {
            try
            {
                JsonSerializer.Deserialize<Dictionary<string, string>>(CustomHeaders);
            }
            catch
            {
                exceptions.Add(new Exception("Custom Headers must be valid JSON object."));
            }
        }

        // Validate Timeout
        if (!string.IsNullOrWhiteSpace(TimeoutSeconds))
        {
            if (!int.TryParse(TimeoutSeconds, out int timeout) || timeout <= 0)
            {
                exceptions.Add(new Exception("Timeout must be a positive integer."));
            }
        }

        return exceptions;
    }

    private string BuildPayload(WorkflowExecutionContext context)
    {
        var payload = PayloadTemplate;

        // If no template provided, build a default payload with all form fields
        if (string.IsNullOrWhiteSpace(payload))
        {
            var formData = new Dictionary<string, object>();

            foreach (var field in context.Record.RecordFields)
            {
                var fieldAlias = field.Key.ToString();
                var fieldValue = field.Value.ValuesAsString();
                formData[fieldAlias] = fieldValue;
            }

            payload = JsonSerializer.Serialize(formData);
        }
        else
        {
            // Replace placeholders with actual field values
            foreach (var field in context.Record.RecordFields)
            {
                var fieldAlias = field.Key.ToString();
                var fieldValue = field.Value.ValuesAsString();
                var placeholder = $"{{{fieldAlias}}}";

                payload = payload.Replace(placeholder, fieldValue, StringComparison.OrdinalIgnoreCase);
            }
        }

        return payload;
    }
}