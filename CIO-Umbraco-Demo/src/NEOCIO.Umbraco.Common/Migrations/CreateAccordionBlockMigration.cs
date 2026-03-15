using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.PropertyEditors;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Strings;
using Umbraco.Cms.Infrastructure.Migrations;


namespace NEOCIO.Umbraco.Common.Migrations;

public class CreateAccordionBlockMigration(
    PropertyEditorCollection propertyEditors,
    IShortStringHelper shortStringHelper,
    IContentTypeService contentTypeService,
    IDataTypeService dataTypeService,
    IMigrationContext context)
    : AsyncMigrationBase(context)
{

    protected override async Task MigrateAsync()
    {
        if (contentTypeService.Get("accordion") != null)
            return;

        var accordion = new ContentType(shortStringHelper, -1)
        {
            Alias = "accordion",
            Name = "Accordion Block",
            Icon = "icon-file-cabinet color-green",
            IsElement = true
        };

        // Tabs
        accordion.AddPropertyGroup("content", "Content");
        accordion.AddPropertyGroup("tabs", "Tabs");

        // Helper to find the default Data Type for a given Editor Alias
        async Task AddPropertyByAlias(string alias, string name, string editorAlias, string groupAlias, int sortOrder, string description = "")
        {
            // Gets the standard built-in configuration for that editor (e.g., default Color Picker)
            var dataType = (await dataTypeService.GetByEditorAliasAsync(editorAlias)).FirstOrDefault();

            if (dataType != null)
            {
                accordion.AddPropertyType(new PropertyType(shortStringHelper, dataType)
                {
                    Alias = alias,
                    Name = name,
                    Description = description,
                    SortOrder = sortOrder
                }, groupAlias);
            }
        }

        // --- CONTENT TAB ---
        // Use Constants instead of GUIDs
        await AddPropertyByAlias("items", "Items", Constants.PropertyEditors.Aliases.BlockList, "content", 0);
        await AddPropertyByAlias("titleColor", "Title Color", Constants.PropertyEditors.Aliases.ColorPicker, "content", 2);
        await AddPropertyByAlias("contentColor", "Content Color", Constants.PropertyEditors.Aliases.ColorPicker, "content", 3);
        await AddPropertyByAlias("iconColor", "Icon Color", Constants.PropertyEditors.Aliases.ColorPicker, "content", 4);
        await AddPropertyByAlias("iconBackgroundColor", "Icon Background Color", Constants.PropertyEditors.Aliases.ColorPicker, "content", 5);
        // --- TABS TAB ---
        await AddPropertyByAlias("tabColor", "Tab Color", Constants.PropertyEditors.Aliases.ColorPicker, "tabs", 0);
        await AddPropertyByAlias("tabHoverColor", "Tab Hover Color", Constants.PropertyEditors.Aliases.ColorPicker, "tabs", 1);
        await AddPropertyByAlias("useTabAccordion", "Use Tab Accordion", Constants.PropertyEditors.Aliases.Boolean, "tabs", 2);
        await contentTypeService.CreateAsync(accordion, Constants.Security.SuperUserKey);
    }
}
