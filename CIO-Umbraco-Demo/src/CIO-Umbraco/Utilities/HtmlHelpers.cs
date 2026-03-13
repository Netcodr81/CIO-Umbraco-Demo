using System.Text.RegularExpressions;

namespace CIOUmbracoDemo.Utilities;

public static class HtmlHelpers
{
    public static string SanitizeHtml(string? html)
    {
        if (string.IsNullOrEmpty(html)) return string.Empty;

        // Remove script and style blocks
        html = Regex.Replace(html, "<(script|style)[\\s\\S]*?>[\\s\\S]*?<\\/(script|style)>", string.Empty, RegexOptions.IgnoreCase);

        // Remove iframe/object/embed tags
        html = Regex.Replace(html, "<(iframe|object|embed)[\\s\\S]*?>[\\s\\S]*?<\\/(iframe|object|embed)>", string.Empty, RegexOptions.IgnoreCase);

        // Remove event handler attributes like onclick="..."
        html = Regex.Replace(html, "\\son[a-zA-Z]+\\s*=\\s*(\"[^\"]*\"|'[^']*')", string.Empty, RegexOptions.IgnoreCase);

        // Neutralize javascript: URIs in href/src
        html = Regex.Replace(html, "(href|src)\\s*=\\s*(\"|')\\s*javascript:[^\"']*(\"|')", "$1=$2# $3", RegexOptions.IgnoreCase);

        // Optionally, strip any remaining on* attributes without values
        html = Regex.Replace(html, "\\son[a-zA-Z]+", string.Empty, RegexOptions.IgnoreCase);

        return html;
    }
}
