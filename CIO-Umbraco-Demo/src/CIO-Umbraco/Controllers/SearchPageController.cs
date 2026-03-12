using CIOUmbracoDemo.Models;
using Examine;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ViewEngines;
using System.Text.RegularExpressions;
using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Routing;
using Umbraco.Cms.Core.Web;
using Umbraco.Cms.Infrastructure.Examine;
using Umbraco.Cms.Web.Common.Controllers;
using SearchResult = CIOUmbracoDemo.Models.SearchResult;

namespace CIOUmbracoDemo.Controllers;

/// <summary>
/// Render Controller for the SearchPage document type
/// This controller is automatically matched to pages using the "searchPage" document type
/// </summary>
public class SearchPageController : RenderController
{
    private readonly IExamineManager _examineManager;
    private readonly ILogger<RenderController> _logger;
    private readonly IPublishedContentQuery _contentQuery;
    private readonly IPublishedUrlProvider _urlProvide;


    public SearchPageController(
        IExamineManager examineManager,
        ILogger<RenderController> logger,
        IPublishedContentQuery contentQuery,
        IPublishedUrlProvider urlProvide,
        ICompositeViewEngine compositeViewEngine,
        IUmbracoContextAccessor umbracoContextAccessor) : base(logger, compositeViewEngine, umbracoContextAccessor)
    {
        _examineManager = examineManager;
        _logger = logger;
        _contentQuery = contentQuery;
        _urlProvide = urlProvide;
    }

    /// <summary>
    /// Strips all content within square brackets [...] from the input string
    /// </summary>
    /// <param name="input">The input string containing JSON arrays or other bracketed content</param>
    /// <returns>Clean string without any [...] content</returns>
    private static string StripBracketedContent(string input)
    {
        if (string.IsNullOrWhiteSpace(input))
            return string.Empty;

        // Remove all [...] content (handles nested brackets too)
        var cleaned = Regex.Replace(input, @"\[[^\[\]]*\]", string.Empty);

        // Keep removing until no more brackets remain (for nested cases)
        while (Regex.IsMatch(cleaned, @"\[[^\[\]]*\]"))
        {
            cleaned = Regex.Replace(cleaned, @"\[[^\[\]]*\]", string.Empty);
        }

        // Remove extra whitespace and trim
        cleaned = Regex.Replace(cleaned, @"\s+", " ").Trim();

        return cleaned;
    }

    /// <summary>
    /// Default action - renders the search page
    /// Overrides the base Index() method to provide search functionality using Examine
    /// </summary>
    public override IActionResult Index()
    {
        // Get the search query from the URL query string
        var query = Request.Query["query"].ToString();

        // Get page number from query string (default to 1)
        var pageNumber = int.TryParse(Request.Query["page"].ToString(), out var p) && p > 0 ? p : 1;

        // Set page size (items per page)
        const int pageSize = 10;

        // Pass the query to the view
        ViewData["SearchQuery"] = query;

        // If there's a query, perform the search
        if (!string.IsNullOrWhiteSpace(query))
        {
            try
            {

                // Get the External index (published content)
                if (!_examineManager.TryGetIndex(Umbraco.Cms.Core.Constants.UmbracoIndexes.ExternalIndexName, out IIndex? index))
                {
                    _logger.LogError("Could not find the External index");
                    ViewData["SearchError"] = "Search index is not available.";
                    return CurrentTemplate(CurrentPage);
                }

                // Create a search query
                var searcher = index.Searcher;

                // Build the query - search across multiple fields
                var searchQuery = searcher.CreateQuery(IndexTypes.Content);

                // Search for the query in multiple fields
                var results = searchQuery
                    .GroupedOr(new[]
                    {
                        "nodeName",
                        "pageTitle",
                        "contentGrid",
                    }, query)
                    .Execute();

                var mediaResults = searcher.CreateQuery(IndexTypes.Media)
                     .GroupedOr(new[]
                     {
                        "nodeName",
                        "umbracoFile"
                     }, query)
                     .And()
                     .Field("__NodeTypeAlias", "File")
                     .Execute();

                // Convert Examine results to SearchResult model
                var allSearchResults = results.Select(result =>
                {
                    var fields = result.AllValues.ToDictionary(
                        kvp => kvp.Key.ToLowerInvariant(),
                        kvp => string.Join(", ", kvp.Value)
                    );

                    var content = _contentQuery.Content(result.Id);

                    // Get raw content grid and clean it
                    var rawContentGrid = fields.GetValueOrDefault("contentgrid") ?? string.Empty;
                    var cleanContentGrid = StripBracketedContent(rawContentGrid);

                    return new CIOUmbracoDemo.Models.SearchResult
                    {
                        Url = _urlProvide.GetUrl(content),
                        UrlName = fields.GetValueOrDefault("urlname") ?? string.Empty,
                        PageTitle = fields.GetValueOrDefault("pagetitle")
                            ?? fields.GetValueOrDefault("nodename")
                            ?? fields.GetValueOrDefault("title")
                            ?? "Untitled",
                        ContentGrid = cleanContentGrid,
                        ContentType = ContentType.SiteContent
                    };
                }).ToList();

                var allMediaResults = mediaResults.Select(result =>
                {

                    var fields = result.AllValues.ToDictionary(
                        kvp => kvp.Key.ToLowerInvariant(),
                        kvp => string.Join(", ", kvp.Value)
                    );

                    var content = _contentQuery.Media(result.Id);

                    return new SearchResult
                    {
                        Url = _urlProvide.GetMediaUrl(content),
                        UrlName = fields.GetValueOrDefault("umbracofilesrc"),
                        PageTitle = fields.GetValueOrDefault("umbracofilesrc"),
                        ContentGrid = string.Empty,
                        ContentType = ContentType.Media
                    };
                }).ToList();

                allSearchResults.AddRange(allMediaResults);

                // Calculate pagination
                var totalResults = allSearchResults.Count;
                var totalPages = (int)Math.Ceiling(totalResults / (double)pageSize);

                // Ensure page number is within valid range
                pageNumber = Math.Max(1, Math.Min(pageNumber, totalPages > 0 ? totalPages : 1));

                // Get items for current page
                var pagedResults = allSearchResults
                    .Skip((pageNumber - 1) * pageSize)
                    .Take(pageSize)
                    .ToList();

                ViewData["SearchResults"] = new SearchResults
                {
                    Items = pagedResults,
                    Query = query,
                    TotalResults = totalResults,
                    CurrentPage = pageNumber,
                    PageSize = pageSize,
                    TotalPages = totalPages
                };

            }
            catch (Exception ex)
            {
                ViewData["SearchError"] = $"An error occurred while searching: {ex.Message}";
            }
        }

        return CurrentTemplate(CurrentPage);
    }
}