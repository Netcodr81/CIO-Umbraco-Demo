using NEOCIO.Umbraco.Common.Migrations;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;
using Umbraco.Extensions;

namespace NEOCIO.Umbraco.Common.Composers;

public class MyPackageComposer : IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        // Register the Plan. Umbraco will automatically find and 
        // execute the Migration classes defined inside the Plan.
        builder.PackageMigrationPlans().Add<MyPackageMigrationPlan>();
    }
}
