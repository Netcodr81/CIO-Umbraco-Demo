using Microsoft.Extensions.Options;
using System.Reflection;
using Umbraco.Cms.Core.Configuration.Models;
using Umbraco.Cms.Core.IO;
using Umbraco.Cms.Core.PropertyEditors;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Strings;
using Umbraco.Cms.Infrastructure.Migrations;
using Umbraco.Cms.Infrastructure.Packaging;

namespace NEOCIO.Umbraco.Components.Migrations;

public class ImportPackageXmlMigration : AsyncPackageMigrationBase
{
    public ImportPackageXmlMigration(
        IPackagingService packagingService,
        IMediaService mediaService,
        MediaFileManager mediaFileManager,
        MediaUrlGeneratorCollection mediaUrlGenerators,
        IShortStringHelper shortStringHelper,
        IContentTypeBaseServiceProvider contentTypeBaseServiceProvider,
        IMigrationContext context,
        IOptions<PackageMigrationSettings> packageMigrationSettings)
        : base(packagingService,
            mediaService,
            mediaFileManager,
            mediaUrlGenerators,
            shortStringHelper,
            contentTypeBaseServiceProvider,
            context, packageMigrationSettings)
    {
    }

    protected async override Task MigrateAsync()
    {
        // Import the xml package embedded in this assembly. This contains the
        // document types, data types and other definitions required by the package.
        ImportPackage.FromEmbeddedResource(GetType()).Do();

        // Note: uSync extraction/handling has been removed. We rely on package.xml
        // import only. If you need to regenerate ModelsBuilder source files, keep
        // ModelsBuilder configured appropriately (e.g. SourceCodeAuto) and run a
        // build/restart after migration so generated models are compiled.
    }
}
