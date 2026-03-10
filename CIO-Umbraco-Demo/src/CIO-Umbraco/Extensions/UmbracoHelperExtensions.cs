using Umbraco.Cms.Web.Common;
using Umbraco.Cms.Web.Common.PublishedModels;

namespace CIOUmbracoDemo.Extensions;

public static class UmbracoHelperExtensions
{
    public static string GetCurrentTheme(this UmbracoHelper helper)
    {
        var currentPage = helper.AssignedContentItem;
        var siteSettings = currentPage?.Root().FirstChild<SiteSettings>();
        var theme = siteSettings?.Theme?.ToLower() ?? "blue";
        return theme;
    }
}
