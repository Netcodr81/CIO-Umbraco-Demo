using CIO_Umbraco_Demo.Views.Partials.Forms.Data;
using Microsoft.EntityFrameworkCore;
using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Notifications;

namespace CIO_Umbraco_Demo.Notifications;

public class RunFormsMigration(FormsDbContext formsContext)
    : INotificationAsyncHandler<UmbracoApplicationStartedNotification>
{
    public async Task HandleAsync(UmbracoApplicationStartedNotification notification,
        CancellationToken cancellationToken)
    {
        IEnumerable<string> pendingMigrations =
            await formsContext.Database.GetPendingMigrationsAsync(cancellationToken);

        if (pendingMigrations.Any())
        {
            await formsContext.Database.MigrateAsync(cancellationToken);
        }
    }
}