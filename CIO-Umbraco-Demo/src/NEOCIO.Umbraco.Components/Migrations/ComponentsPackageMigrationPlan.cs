using Umbraco.Cms.Core.Packaging;

namespace NEOCIO.Umbraco.Components.Migrations;

public class ComponentsPackageMigrationPlan : PackageMigrationPlan
{
    public ComponentsPackageMigrationPlan()
        : base("NEOCIOUmbracoComponents")
    {
    }

    protected override void DefinePlan()
    {
        To<ImportPackageXmlMigration>(new Guid("6bc5a74a-4a12-46b7-b2aa-d410e6271366"));
    }
}
