using System.Text;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Extensions;

namespace CIOUmbracoDemo.Extensions;

public static class LayoutExtensions
{
    extension(IPublishedElement? settings)
    {
        public string GenerateLayoutStyles()
        {
            var layoutStyles = new StringBuilder();

            var layoutAreasColor = settings?.Value<string>("layoutAreasColourPicker");
            var layoutSettingsColor = settings?.Value<string>("layoutSettingsColourPicker");

            if (!string.IsNullOrWhiteSpace(layoutAreasColor))
            {
                layoutStyles.Append($" background-color:{layoutSettingsColor}");
            }

            return layoutStyles.ToString();
        }

        public string GenerateLayoutClasses()
        {
            var layoutClasses = new StringBuilder();

            var containerStyle = settings?.Value<string>("containerStyle");
            var applyDefaultPadding = settings?.Value<bool?>("applyDefaultPadding") == true;
            var paddingTop = settings?.Value<string>("paddingTop");
            var paddingBottom = settings?.Value<string>("paddingBottom");
            var paddingLeft = settings?.Value<string>("paddingLeft");
            var paddingRight = settings?.Value<string>("paddingRight");
            var marginTop = settings?.Value<string>("marginTop");
            var marginBottom = settings?.Value<string>("marginBottom");
            var marginLeft = settings?.Value<string>("marginLeft");
            var marginRight = settings?.Value<string>("marginRight");

            if (!string.IsNullOrWhiteSpace(containerStyle))
            {
                layoutClasses.Append($" {containerStyle}");
            }

            if (applyDefaultPadding)
            {
                layoutClasses.Append(" p-3");
            }

            if (!string.IsNullOrWhiteSpace(paddingTop))
            {
                layoutClasses.Append($" {paddingTop}");
            }

            if (!string.IsNullOrWhiteSpace(paddingBottom))
            {
                layoutClasses.Append($" {paddingBottom}");
            }

            if (!string.IsNullOrWhiteSpace(paddingLeft))
            {
                layoutClasses.Append($" {paddingLeft}");
            }

            if (!string.IsNullOrWhiteSpace(paddingRight))
            {
                layoutClasses.Append($" {paddingRight}");
            }

            if (!string.IsNullOrWhiteSpace(marginTop))
            {
                layoutClasses.Append($" {marginTop}");
            }

            if (!string.IsNullOrWhiteSpace(marginBottom))
            {
                layoutClasses.Append($" {marginBottom}");
            }

            if (!string.IsNullOrWhiteSpace(marginLeft))
            {
                layoutClasses.Append($" {marginLeft}");
            }

            if (!string.IsNullOrWhiteSpace(marginRight))
            {
                layoutClasses.Append($" {marginRight}");
            }

            return layoutClasses.ToString();
        }
    }
}
