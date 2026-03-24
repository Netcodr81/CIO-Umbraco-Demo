using NEOCIO.Umbraco.Components.Migrations;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Infrastructure.Migrations.Notifications;

namespace NEOCIO.Umbraco.Components.Composers;

/// <summary>
/// Registers migrations and notification handlers for the NEOCIO Umbraco Components package
/// </summary>
public class ComponentsComposer : IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        // Register the migration plan
        builder.PackageMigrationPlans()
            .Add<ComponentsPackageMigrationPlan>();

        // Register the post-migration notification handler
        builder.AddNotificationAsyncHandler<MigrationPlansExecutedNotification, PostMigrationNotificationHandler>();
    }
}
