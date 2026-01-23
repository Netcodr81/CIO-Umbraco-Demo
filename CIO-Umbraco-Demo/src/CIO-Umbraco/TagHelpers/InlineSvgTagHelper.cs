using System.Text.RegularExpressions;

namespace CIO_Umbraco.TagHelpers;

using CIO_Umbraco.Utilities;
using Microsoft.AspNetCore.Razor.TagHelpers;
using Umbraco.Cms.Core.Models.PublishedContent;

[HtmlTargetElement("inline-svg")]
public class InlineSvgTagHelper(ISvgRenderer svgRenderer) : TagHelper
{


    /// <summary>
    /// The Umbraco media item (SVG) to render
    /// </summary>
    public IPublishedContent? MediaItem { get; set; }


    /// <summary>
    /// Optional CSS class for the SVG element
    /// </summary>
    public string? Class { get; set; }

    /// <summary>
    /// Width for SVG (px, %, etc.)
    /// </summary>
    public string? Width { get; set; }

    /// <summary>
    /// Height for SVG (px, %, etc.)
    /// </summary>
    public string? Height { get; set; }

    public string? Fill { get; set; } = "none";


    public override void Process(TagHelperContext context, TagHelperOutput output)
    {
        var svgContent = svgRenderer.GetInlineSvg(MediaItem);

        if (string.IsNullOrWhiteSpace(svgContent))
        {
            output.SuppressOutput();
            return;
        }

        // Replace or add width, height, and class attributes
        string svgTagPattern = "<svg[^>]*>";
        var match = Regex.Match(svgContent, svgTagPattern, RegexOptions.IgnoreCase);
        if (match.Success)
        {
            string svgTag = match.Value;
            string newSvgTag = svgTag;

            if (!string.IsNullOrWhiteSpace(Class))
                newSvgTag = Regex.Replace(newSvgTag, "class=\"[^\"]*\"", $"class=\"{Class}\"", RegexOptions.IgnoreCase)
                    .Replace("<svg", $"<svg class=\"{Class}\"");

            if (!string.IsNullOrWhiteSpace(Width))
                newSvgTag = Regex.Replace(newSvgTag, "width=\"[^\"]*\"", $"width=\"{Width}\"", RegexOptions.IgnoreCase)
                    .Replace("<svg", $"<svg width=\"{Width}\"");

            if (!string.IsNullOrWhiteSpace(Height))
                newSvgTag = Regex.Replace(newSvgTag, "height=\"[^\"]*\"", $"height=\"{Height}\"", RegexOptions.IgnoreCase)
                    .Replace("<svg", $"<svg height=\"{Height}\"");

            if (!string.IsNullOrWhiteSpace(Height))
                newSvgTag = Regex.Replace(newSvgTag, "fill=\"[^\"]*\"", $"fill=\"{Fill}\"", RegexOptions.IgnoreCase)
                    .Replace("<svg", $"<svg fill=\"{Fill}\"");

            // Remove duplicate attributes if any were added
            newSvgTag = Regex.Replace(newSvgTag, "(class=\"[^\"]*\"){2,}", $"class=\"{Class}\"");
            newSvgTag = Regex.Replace(newSvgTag, "(width=\"[^\"]*\"){2,}", $"width=\"{Width}\"");
            newSvgTag = Regex.Replace(newSvgTag, "(height=\"[^\"]*\"){2,}", $"height=\"{Height}\"");
            newSvgTag = Regex.Replace(newSvgTag, "(fill=\"[^\"]*\"){2,}", $"fill=\"{Fill}\"");


            svgContent = svgContent.Replace(svgTag, newSvgTag);
        }

        output.TagName = null; // Output only SVG, no wrapper
        output.Content.SetHtmlContent(svgContent);
    }


}

