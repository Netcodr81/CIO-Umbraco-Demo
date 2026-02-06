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

    public static string GetPageBackgroundColor(this IPublishedContent content, string defaultColor = "#f3f7fc")
    {

        if (content is HomePage homePage && !string.IsNullOrWhiteSpace(homePage?.Color?.Color))
        {

            defaultColor = homePage?.Color?.Color ?? defaultColor;
        }

        if (content is ContentPage pageContent && !string.IsNullOrWhiteSpace(pageContent?.Color?.Color))
        {

            defaultColor = pageContent?.Color?.Color ?? defaultColor;
        }

        return defaultColor;
    }


}
