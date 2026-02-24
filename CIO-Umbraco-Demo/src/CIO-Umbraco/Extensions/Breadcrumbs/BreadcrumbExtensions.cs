using Umbraco.Cms.Core.Models.PublishedContent;

namespace Extensions.Breadcrumbs;

public static class BreadcrumbExtensions
{
    public static IEnumerable<BreadcrumbItem> GetBreadcrumbs(
        this IPublishedContent currentPage)
    {
        var root = currentPage.Root();

        return currentPage
            .AncestorsOrSelf()
            .Where(x => x.Level >= root.Level)
            .Reverse()
            .Select(x => new BreadcrumbItem(
                x.Name,
                x.Url(),
                x.Id == currentPage.Id
            ));
    }
}