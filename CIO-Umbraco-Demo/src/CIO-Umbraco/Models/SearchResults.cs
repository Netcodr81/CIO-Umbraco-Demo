namespace CIOUmbracoDemo.Models;


public class SearchResults
{
    public List<SearchResult> Items { get; set; }
    public string? Query { get; set; }
    public int TotalResults { get; set; }
    public int CurrentPage { get; set; }
    public int PageSize { get; set; }
    public int TotalPages { get; set; }
}

public class SearchResult
{
    public string Url { get; set; }
    public string UrlName { get; set; }
    public string PageTitle { get; set; }
    public string ContentGrid { get; set; }
    public ContentType ContentType { get; set; }
}

public enum ContentType
{
    Media,
    SiteContent
}


