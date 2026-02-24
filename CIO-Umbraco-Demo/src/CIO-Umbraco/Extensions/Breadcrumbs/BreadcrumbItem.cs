namespace Extensions.Breadcrumbs;

public class BreadcrumbItem
{
    public string? Name { get; set; }
    public string? Url { get; set; }
    public bool IsCurrent { get; set; }

    public BreadcrumbItem()
    {
    }

    public BreadcrumbItem(string? name, string? url, bool isCurrent)
    {
        Name = name;
        Url = url;
        IsCurrent = isCurrent;
    }
}