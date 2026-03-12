namespace CIOUmbracoDemo.Models;


public class SearchResults
{
    public List<SearchResult> Items { get; set; }
    public string? Query { get; set; }
}

public class SearchResult
{
    public string Url { get; set; }
    public string UrlName { get; set; }
    public string PageTitle { get; set; }
    public string ContentGrid { get; set; }
}


