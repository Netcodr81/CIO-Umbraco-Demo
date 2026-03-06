using CIO_Umbraco_Demo.Notifications;
using CIO_Umbraco_Demo.Views.Partials.Forms.Data;
using Mapster;
using Microsoft.EntityFrameworkCore;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.Notifications;

namespace CIO_Umbraco_Demo.ServiceComposers;

public class DataComposers : IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        builder.Services.AddDbContextFactory<FormsDbContext>(options =>
        {
            options.UseSqlServer(builder.Config.GetConnectionString("umbracoDbDSN"));
        });

        builder.AddNotificationAsyncHandler<UmbracoApplicationStartedNotification, RunContactFormMigration>();

        builder.Services.AddMapster();
    }
}