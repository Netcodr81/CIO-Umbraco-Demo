using Microsoft.AspNetCore.Razor.TagHelpers;
using System.Text.Encodings.Web;

namespace CIO_Umbraco.TagHelpers;

[HtmlTargetElement("svg-icon")]
public class SvgIconTagHelper(IWebHostEnvironment env) : TagHelper
{


    /// <summary>
    /// Path to the SVG file, relative to wwwroot (e.g. "icons/chevron-down.svg")
    /// </summary>
    public string Src { get; set; } = string.Empty;

    public string? Title { get; set; }
    public string? Desc { get; set; }

    // Pass-through attributes prefixed with "svg-"
    [HtmlAttributeName(DictionaryAttributePrefix = "svg-")]
    public IDictionary<string, string> AdditionalAttributes { get; set; }
        = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);

    public override void Process(TagHelperContext context, TagHelperOutput output)
    {
        output.TagName = "svg";
        output.TagMode = TagMode.StartTagAndEndTag;

        // Add extra attributes
        foreach (var attr in AdditionalAttributes)
        {
            var key = attr.Key.StartsWith("svg-", StringComparison.OrdinalIgnoreCase)
                ? attr.Key[4..]
                : attr.Key;
            output.Attributes.SetAttribute(key, attr.Value);
        }

        // Read SVG file content
        string svgContent = string.Empty;
        if (!string.IsNullOrWhiteSpace(Src))
        {
            var filePath = Path.Combine(env.WebRootPath, Src.Replace('/', Path.DirectorySeparatorChar));
            if (File.Exists(filePath))
            {
                svgContent = File.ReadAllText(filePath);
            }
        }

        // Remove outer <svg> if present
        if (!string.IsNullOrEmpty(svgContent))
        {
            int start = svgContent.IndexOf('>');
            int end = svgContent.LastIndexOf("</svg>", StringComparison.OrdinalIgnoreCase);
            if (svgContent.TrimStart().StartsWith("<svg", StringComparison.OrdinalIgnoreCase) && start > 0 && end > start)
            {
                svgContent = svgContent.Substring(start + 1, end - start - 1);
            }
        }

        // Compose content
        var content = "";
        if (!string.IsNullOrWhiteSpace(Title))
            content += $"<title>{HtmlEncoder.Default.Encode(Title)}</title>";
        if (!string.IsNullOrWhiteSpace(Desc))
            content += $"<desc>{HtmlEncoder.Default.Encode(Desc)}</desc>";
        content += svgContent;

        output.Content.SetHtmlContent(content);
    }
}
