using Umbraco.Cms.Core.Composing;
using Utilities;

namespace ServiceComponsers;

public class ServiceComposers : IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        builder.Services.AddSingleton<ISvgRenderer, FileSvgRenderer>();
    }
}
