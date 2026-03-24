using Umbraco.Cms.Core.Composing;
using Umbraco.Community.BlockPreview;
using Umbraco.Community.BlockPreview.Extensions;

namespace CIOUmbracoDemo.BlockPreviews;

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
                    "/css/block-preview.css",
                    "/css/component-styles.css"
                ]
            };
            options.BlockList = new BlockTypeSettings
            {
                Enabled = true,
                Stylesheets = [
                    "/css/layout.css",
                    "/css/block-preview.css",
                    "/css/component-styles.css"
                ]
            };
        });
    }
}