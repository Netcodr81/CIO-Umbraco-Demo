using Umbraco.Cms.Core.Composing;
using Umbraco.Community.BlockPreview;
using Umbraco.Community.BlockPreview.Extensions;

namespace BlockPreviews;

public class BlockPreviewComposer : IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        builder.AddBlockPreview(options =>
        {
            options.BlockGrid = new BlockTypeSettings
            {
                Enabled = true,
                Stylesheets = [
                    "/css/Index.css",
                    "/css/block-preview.css"
                ]
            };
            options.BlockList = new BlockTypeSettings
            {
                Enabled = true,
                Stylesheets = [
                    "/css/Index.css",
                    "/css/block-preview.css"
                ]
            };
        });
    }
}