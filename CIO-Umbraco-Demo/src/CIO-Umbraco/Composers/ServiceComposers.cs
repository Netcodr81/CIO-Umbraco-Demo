

using CIO_Umbraco.Utilities;
using Umbraco.Cms.Core.Composing;

namespace CIO_Umbraco.Composers;

public class ServiceComposers : IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        builder.Services.AddSingleton<ISvgRenderer, FileSvgRenderer>();
    }
}
