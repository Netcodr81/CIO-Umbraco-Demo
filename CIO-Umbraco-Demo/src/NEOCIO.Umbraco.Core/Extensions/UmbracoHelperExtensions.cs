using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Web.Common;

namespace NEOCIO.Umbraco.Core.Extensions;

public static class UmbracoHelperExtensions
{
    public static IPublishedElement? GetSiteSettings(this UmbracoHelper helper)
    {
        var currentPage = helper.AssignedContentItem;
        // Get the first child of the root (SiteSettings) as IPublishedElement
        var siteSettings = currentPage?.Root()?.FirstChild();
        return siteSettings;
    }

    public static string GetCurrentTheme(this UmbracoHelper helper)
    {
        var siteSettings = helper.GetSiteSettings();
        // Access property by alias
        var theme = siteSettings?.Value<string>("theme")?.ToLower() ?? "blue";
        return theme;
    }
}
