using CIO_Umbraco_Demo.Views.Partials.Forms.Data;
using CIO_Umbraco_Demo.Views.Partials.Forms.Models;
using MapsterMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models_Umbraco_Demo.Views.Partials.Forms.Data.Models;
using Umbraco.Cms.Core.Cache;
using Umbraco.Cms.Core.Logging;
using Umbraco.Cms.Core.Routing;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;
using Umbraco.Cms.Infrastructure.Persistence;
using Umbraco.Cms.Web.Website.Controllers;


namespace Controllers;

public class ContactFormController : SurfaceController
{
    private readonly IMapper _mapper;
    private readonly IDbContextFactory<FormsDbContext> _contextFactory;

    public ContactFormController(
        IMapper mapper,
        IDbContextFactory<FormsDbContext> contextFactory,
        IUmbracoContextAccessor umbracoContextAccessor,
        IUmbracoDatabaseFactory databaseFactory,
        ServiceContext services,
        AppCaches appCaches,
        IProfilingLogger profilingLogger,
        IPublishedUrlProvider publishedUrlProvider) : base(umbracoContextAccessor, databaseFactory, services, appCaches, profilingLogger, publishedUrlProvider)
    {
        _mapper = mapper;
        _contextFactory = contextFactory;
    }

    [HttpPost]
    public IActionResult Submit(ContactFormViewModel formData)
    {
        if (!ModelState.IsValid)
        {
            // Return to the current page with validation errors
            return CurrentUmbracoPage();
        }

        try
        {
            var context = _contextFactory.CreateDbContext();

            var formDataToSave = _mapper.Map<ContactForm>(formData);
            formDataToSave.SubmittedOn = DateTimeOffset.UtcNow;

            context.ContactForms.Add(formDataToSave);
            context.SaveChanges();

            // Add success message to TempData
            TempData["ContactFormSuccess"] = true;

            // Redirect to current page (will show success message)
            return RedirectToCurrentUmbracoPage();
        }
        catch (Exception ex)
        {
            // Log the error
            // _logger.LogError(ex, "Error processing contact form");

            // Add error to ModelState
            ModelState.AddModelError(string.Empty, "An error occurred while processing your submission. Please try again.");

            // Return to form with error
            return CurrentUmbracoPage();
        }
    }
}