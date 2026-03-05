using CIO_Umbraco_Demo.Views.Partials.Forms.Data;
using Microsoft.EntityFrameworkCore;
using Umbraco.Cms.Core.Composing;

namespace CIO_Umbraco_Demo.ServiceComposers;

public class DataComposers : IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        builder.Services.AddDbContext<FormsDbContext>(options =>
        {
            options.UseSqlServer(builder.Config.GetConnectionString("umbracoDbDSN"));
        });


    }
}