using CIO_Umbraco_Demo.Workflows;
using Umbraco.Cms.Core.Composing;
using Umbraco.Forms.Core.Providers;

namespace CIO_Umbraco_Demo.ServiceComposers;

public class FormComposers : IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        builder.WithCollectionBuilder<WorkflowCollectionBuilder>()
            .Add<WebApiRequestWorkflow>();
    }
}