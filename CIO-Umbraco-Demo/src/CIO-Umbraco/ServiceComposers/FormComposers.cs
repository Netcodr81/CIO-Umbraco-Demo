using CIOUmbracoDemo.Workflows;
using Umbraco.Cms.Core.Composing;
using Umbraco.Forms.Core.Providers;

namespace CIOUmbracoDemo.ServiceComposers;

public class FormComposers : IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        builder.WithCollectionBuilder<WorkflowCollectionBuilder>()
            .Add<WebApiRequestWorkflow>();
    }
}