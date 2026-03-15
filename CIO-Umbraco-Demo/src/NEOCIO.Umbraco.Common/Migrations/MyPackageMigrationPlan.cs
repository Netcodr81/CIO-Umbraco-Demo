using Umbraco.Cms.Core.Packaging;

namespace NEOCIO.Umbraco.Common.Migrations;

public class MyPackageMigrationPlan : PackageMigrationPlan
{
    // The name "MyPackage" is how Umbraco identifies this plan in the DB
    public MyPackageMigrationPlan() : base("MyPackage") { }

    protected override void DefinePlan()
    {
        // State 1: Run the migration that creates all custom Data Types
        //To<CreateDataTypesMigration>("data-types-done");

        // State 2: Run the migration for the Accordion Block
        To<CreateAccordionBlockMigration>("accordion-done");

        // State 3: Run the migration for a Hero Block (or any other type)
        //To<CreateHeroBlockMigration>("hero-done");

        // Future updates: If you release v2.0, you just add:
        // To<UpdateAccordionMigration>("accordion-v2-done");
    }
}
