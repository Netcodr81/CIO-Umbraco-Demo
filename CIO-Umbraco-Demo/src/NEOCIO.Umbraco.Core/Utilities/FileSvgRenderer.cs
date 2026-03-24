using Microsoft.AspNetCore.Hosting;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Extensions;

namespace NEOCIO.Umbraco.Core.Utilities;

public interface ISvgRenderer
{
    string? GetInlineSvg(IPublishedContent? mediaItem);
}
public class FileSvgRenderer(IWebHostEnvironment environment) : ISvgRenderer
{

    public string? GetInlineSvg(IPublishedContent? mediaItem)
    {
        if (mediaItem is null || !mediaItem.Url().EndsWith("svg", StringComparison.OrdinalIgnoreCase))
        {
            return null;
        }

        var filePath = Path.Combine(environment.WebRootPath,
            mediaItem.Url().TrimStart("/").Replace("/", Path.DirectorySeparatorChar.ToString()));

        return File.Exists(filePath) ? File.ReadAllText(filePath) : null;
    }
}
