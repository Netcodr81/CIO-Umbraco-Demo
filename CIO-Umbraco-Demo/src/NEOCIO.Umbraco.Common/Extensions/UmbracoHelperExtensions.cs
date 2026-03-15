using Umbraco.Cms.Web.Common;
using Umbraco.Extensions;

namespace NEOCIO.Umbraco.Common.Extensions;

public static class UmbracoHelperExtensions
{
    public static string GetCurrentTheme(this UmbracoHelper helper)
    {
        var currentPage = helper.AssignedContentItem;
        // keep siteSettings as IPublishedElement / IPublishedContent
        var siteSettings = currentPage?.Root().FirstChild("siteSettings");
        // read the property alias "theme" as a string
        var theme = siteSettings?.Value<string>("theme")?.ToLowerInvariant() ?? "blue";
        return theme;
    }
}
