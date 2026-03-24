using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Infrastructure.Migrations;
using Umbraco.Cms.Infrastructure.Migrations.Notifications;

namespace NEOCIO.Umbraco.Components.Migrations;

public class PostMigrationNotificationHandler : INotificationAsyncHandler<MigrationPlansExecutedNotification>
{
    private readonly IContentService _contentService;
    private readonly ILogger<PostMigrationNotificationHandler> _logger;
    private readonly IConfiguration _configuration;
    private readonly IHostApplicationLifetime _appLifetime;
    private readonly IHostEnvironment _env;

    public PostMigrationNotificationHandler(
        IContentService contentService,
        ILogger<PostMigrationNotificationHandler> logger,
        IConfiguration configuration,
        IHostApplicationLifetime appLifetime,
        IHostEnvironment env)
    {
        _contentService = contentService;
        _logger = logger;
        _configuration = configuration;
        _appLifetime = appLifetime;
        _env = env;
    }

    public Task HandleAsync(MigrationPlansExecutedNotification notification, CancellationToken cancellationToken)
    {
        return Task.CompletedTask;
    }

    private bool HasMigrationRun(IEnumerable<ExecutedMigrationPlan> executedMigrationPlans)
    {
        foreach (ExecutedMigrationPlan executedMigrationPlan in executedMigrationPlans)
        {
            foreach (MigrationPlan.Transition transition in executedMigrationPlan.CompletedTransitions)
            {
                if (transition.MigrationType == typeof(ImportPackageXmlMigration))
                {
                    return true;
                }
            }
        }

        return false;
    }
}