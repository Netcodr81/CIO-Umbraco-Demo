using System.Text;
using Umbraco.Cms.Web.Common.PublishedModels;

namespace CIOUmbracoDemo.Extensions;

public static class LayoutExtensions
{
    extension(LayoutSettings settings)
    {
        public string GenerateLayoutStyles()
        {
            var layoutStyles = new StringBuilder();

            // Background Color
            if (!string.IsNullOrWhiteSpace(settings?.LayoutAreasColourPicker?.Color))
            {
                layoutStyles.Append($" background-color:{settings?.LayoutSettingsColourPicker?.Color}");
            }

            return layoutStyles.ToString();
        }

        public string GenerateLayoutClasses()
        {
            var layoutClasses = new StringBuilder();

            if (!string.IsNullOrWhiteSpace(settings?.ContainerStyle))
            {
                layoutClasses.Append($" {settings?.ContainerStyle}");
            }

            if (settings is { ApplyDefaultPadding: true })
            {
                layoutClasses.Append($" p-3");
            }

            // Paddings
            if (!string.IsNullOrWhiteSpace(settings?.PaddingTop))
            {
                layoutClasses.Append($" {settings?.PaddingTop}");
            }

            if (!string.IsNullOrWhiteSpace(settings?.PaddingBottom))
            {
                layoutClasses.Append($" {settings?.PaddingBottom}");
            }

            if (!string.IsNullOrWhiteSpace(settings?.PaddingLeft))
            {
                layoutClasses.Append($" {settings?.PaddingLeft}");
            }

            if (!string.IsNullOrWhiteSpace(settings?.PaddingRight))
            {
                layoutClasses.Append($" {settings?.PaddingRight}");
            }

            //Margins
            if (!string.IsNullOrWhiteSpace(settings?.MarginTop))
            {
                layoutClasses.Append($" {settings?.MarginTop}");
            }

            if (!string.IsNullOrWhiteSpace(settings?.MarginBottom))
            {
                layoutClasses.Append($" {settings?.MarginBottom}");
            }

            if (!string.IsNullOrWhiteSpace(settings?.MarginLeft))
            {
                layoutClasses.Append($" {settings?.MarginLeft}");
            }

            if (!string.IsNullOrWhiteSpace(settings?.MarginRight))
            {
                layoutClasses.Append($" {settings?.MarginRight}");
            }

            return layoutClasses.ToString();
        }
    }
}
