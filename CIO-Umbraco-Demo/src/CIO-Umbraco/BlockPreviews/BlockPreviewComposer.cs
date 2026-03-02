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
                    "/css/layout.css",
                    "/css/block-preview.css"
                ],
                IgnoredContentTypes = ["layout12", "layout363", "layout39", "layout444", "layout66", "layout8"]
            };
            options.BlockList = new BlockTypeSettings
            {
                Enabled = true,
                Stylesheets = [
                    "/css/layout.css",
                    "/css/block-preview.css"
                ]
            };
        });
    }
}