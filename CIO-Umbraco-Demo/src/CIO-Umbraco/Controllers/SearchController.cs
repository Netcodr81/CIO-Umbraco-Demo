using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Core.Cache;
using Umbraco.Cms.Core.Logging;
using Umbraco.Cms.Core.Routing;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;
using Umbraco.Cms.Infrastructure.Persistence;
using Umbraco.Cms.Web.Website.Controllers;

namespace CIOUmbracoDemo.Controllers;

public class SearchController : SurfaceController
{
    private readonly IUmbracoContextAccessor _contextAccessor;

    public SearchController(
        IUmbracoContextAccessor contextAccessor,
        IUmbracoDatabaseFactory databaseFactory,
        ServiceContext services,
        AppCaches appCaches,
        IProfilingLogger profilingLogger,
        IPublishedUrlProvider publishedUrlProvider)
        : base(contextAccessor, databaseFactory, services, appCaches, profilingLogger, publishedUrlProvider)
    {
        _contextAccessor = contextAccessor;
    }

    [HttpPost]
    public IActionResult Search(string query)
    {
        if (string.IsNullOrWhiteSpace(query))
            return Redirect("/");

        return Redirect($"/search?query={query}");
    }
}