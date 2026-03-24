using Microsoft.Extensions.DependencyInjection;
using NEOCIO.Umbraco.Core.Utilities;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;

namespace NEOCIO.Umbraco.Core.Composers;

public class ServiceComposers : IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        builder.Services.AddSingleton<ISvgRenderer, FileSvgRenderer>();
    }
}
