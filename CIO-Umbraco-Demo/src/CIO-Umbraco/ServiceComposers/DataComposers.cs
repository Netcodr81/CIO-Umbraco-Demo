using CIOUmbracoDemo.Notifications;
using CIOUmbracoDemo.Views.Partials.Forms.Data;
using Mapster;
using Microsoft.EntityFrameworkCore;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.Notifications;

namespace CIOUmbracoDemo.ServiceComposers;

public class DataComposers : IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        builder.Services.AddDbContextFactory<FormsDbContext>(options =>
        {
            options.UseSqlServer(builder.Config.GetConnectionString("umbracoDbDSN"));
        });

        builder.AddNotificationAsyncHandler<UmbracoApplicationStartedNotification, RunFormsMigration>();

        builder.Services.AddMapster();
    }
}