using CIO_Umbraco_Demo.Views.Partials.Forms.Data;
using CIO_Umbraco_Demo.Views.Partials.Forms.Data.Models;
using CIO_Umbraco_Demo.Views.Partials.Forms.Models;
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

namespace Controllers;

public class ReportProblemFormController : SurfaceController
{
    private readonly IMapper _mapper;
    private readonly IDbContextFactory<FormsDbContext> _contextFactory;


    public ReportProblemFormController(
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
    public IActionResult Submit(ReportProblemFormViewModel formData)
    {
        if (!ModelState.IsValid)
        {
            return CurrentUmbracoPage();
        }

        try
        {
            var context = _contextFactory.CreateDbContext();

            var formDataToSave = _mapper.Map<ReportProblemForm>(formData);
            formDataToSave.SubmittedOn = DateTimeOffset.UtcNow;

            context.ReportProblemForms.Add(formDataToSave);
            context.SaveChanges();

            TempData["ReportProblemFormSuccess"] = true;

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