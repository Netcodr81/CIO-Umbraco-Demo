using Slimsy.DependencyInjection;
using Umbraco.Cms.Web.Common.PublishedModels;
using Umbraco.Community.BlockPreview.Extensions;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

builder.CreateUmbracoBuilder()
    .AddBackOffice()
    .AddWebsite()
    .AddSlimsy()
    .AddBlockPreview(options =>
    {
        options.BlockGrid = new()
        {
            Enabled = true,
            Stylesheets = [
                "/css/styles.css",
                "/css/layout.css",
                "/css/block-preview.css"
            ],
            IgnoredContentTypes = [NavigationMenu.ModelTypeAlias]

        };
        options.BlockList = new()
        {
            Enabled = true,
            Stylesheets = [
                "/css/styles.css",
                "/css/layout.css",
                "/css/block-preview.css"
            ],
        };
        options.RichText = new()
        {
            Enabled = true,
            Stylesheets = [
                "/css/styles.css",
                "/css/layout.css",
                "/css/block-preview.css"
            ],
        };
    })
    .AddComposers()
    .Build();

WebApplication app = builder.Build();

await app.BootUmbracoAsync();

app.UseHttpsRedirection();

app.UseUmbraco()
    .WithMiddleware(u =>
    {
        u.UseBackOffice();
        u.UseWebsite();
    })
    .WithEndpoints(u =>
    {
        u.UseBackOfficeEndpoints();
        u.UseWebsiteEndpoints();
    });

await app.RunAsync();
