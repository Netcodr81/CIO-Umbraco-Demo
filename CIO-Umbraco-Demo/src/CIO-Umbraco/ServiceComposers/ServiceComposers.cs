using Umbraco.Cms.Core.Composing;
using Utilities;

namespace ServiceComposers;

public class ServiceComposers : IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        builder.Services.AddSingleton<ISvgRenderer, FileSvgRenderer>();
    }
}
