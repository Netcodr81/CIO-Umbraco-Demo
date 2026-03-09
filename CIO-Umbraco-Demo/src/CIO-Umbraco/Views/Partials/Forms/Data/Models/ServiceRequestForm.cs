namespace CIOUmbracoDemo.Views.Partials.Forms.Data.Models;

public class ServiceRequestForm
{
    public required string FormId { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? PhoneNumber { get; set; }
    public string? Email { get; set; }
    public string? Agency { get; set; }
    public string? DescriptionServiceRequested { get; set; }
    public DateTimeOffset SubmittedOn { get; set; }
}