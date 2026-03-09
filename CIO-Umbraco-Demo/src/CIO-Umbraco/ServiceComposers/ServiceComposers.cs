using CIOUmbracoDemo.Utilities;
using Umbraco.Cms.Core.Composing;

namespace CIOUmbracoDemo.ServiceComposers;

public class ServiceComposers : IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        builder.Services.AddSingleton<ISvgRenderer, FileSvgRenderer>();
    }
}
