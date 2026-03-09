using CIOUmbracoDemo.Views.Partials.Forms.Data;
using CIOUmbracoDemo.Views.Partials.Forms.Data.Models;
using CIOUmbracoDemo.Views.Partials.Forms.Models;
using MapsterMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Umbraco.Cms.Core.Cache;
using Umbraco.Cms.Core.Logging;
using Umbraco.Cms.Core.Routing;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;
using Umbraco.Cms.Infrastructure.Persistence;
using Umbraco.Cms.Web.Website.Controllers;

namespace CIOUmbracoDemo.Controllers;

public class ServiceRequestFormController : SurfaceController
{
    private readonly IMapper _mapper;
    private readonly IDbContextFactory<FormsDbContext> _contextFactory;

    public ServiceRequestFormController(
        IMapper mapper,
        IDbContextFactory<FormsDbContext> contextFactory,
        IUmbracoContextAccessor umbracoContextAccessor,
        IUmbracoDatabaseFactory databaseFactory,
        ServiceContext services,
        AppCaches appCaches,
        IProfilingLogger profilingLogger,
        IPublishedUrlProvider publishedUrlProvider) : base(umbracoContextAccessor, databaseFactory, services, appCaches,
        profilingLogger, publishedUrlProvider)
    {
        _mapper = mapper;
        _contextFactory = contextFactory;
    }

    [HttpPost]
    public IActionResult Submit(ServiceRequestFormViewModel formData)
    {
        if (!ModelState.IsValid)
        {

            return CurrentUmbracoPage();
        }

        try
        {
            var context = _contextFactory.CreateDbContext();

            var formDataToSave = _mapper.Map<ServiceRequestForm>(formData);
            formDataToSave.SubmittedOn = DateTimeOffset.UtcNow;

            context.ServiceRequestForms.Add(formDataToSave);
            context.SaveChanges();

            TempData["ServiceRequestFormSuccess"] = true;

            return RedirectToCurrentUmbracoPage();
        }
        catch (Exception ex)
        {

            ModelState.AddModelError(string.Empty,
                "An error occurred while processing your submission. Please try again.");

            return CurrentUmbracoPage();
        }
    }
}