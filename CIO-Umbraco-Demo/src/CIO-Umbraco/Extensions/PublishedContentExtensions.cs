using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Web.Common.PublishedModels;

namespace CIO_Umbraco.Extensions;

public static class PublishedContentExtensions
{
    public static HomePage? GetHomePage(this IPublishedContent publishedContent)
    {
        var homePage = publishedContent.AncestorOrSelf<HomePage>();
        return homePage;
    }

    public static SiteSettings? GetSiteSettings(this IPublishedContent publishedContent)
    {
        var homePage = GetHomePage(publishedContent);
        return homePage?.FirstChild<SiteSettings>();
    }
}
