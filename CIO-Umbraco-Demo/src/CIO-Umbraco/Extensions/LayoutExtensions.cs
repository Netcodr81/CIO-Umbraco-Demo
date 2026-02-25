using System.Text;
using Umbraco.Cms.Web.Common.PublishedModels;

namespace Extensions;

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

            // Paddings
            if (!string.IsNullOrWhiteSpace(settings?.PaddingTop))
            {
                layoutStyles.Append($" padding-top:{settings?.PaddingTop}");
            }

            if (!string.IsNullOrWhiteSpace(settings?.PaddingBottom))
            {
                layoutStyles.Append($" padding-bottom:{settings?.PaddingBottom}");
            }

            if (!string.IsNullOrWhiteSpace(settings?.PaddingLeft))
            {
                layoutStyles.Append($" padding-left:{settings?.PaddingLeft}");
            }

            if (!string.IsNullOrWhiteSpace(settings?.PaddingRight))
            {
                layoutStyles.Append($" padding-right:{settings?.PaddingRight}");
            }

            //Margins
            if (!string.IsNullOrWhiteSpace(settings?.MarginTop))
            {
                layoutStyles.Append($" margin-top:{settings?.MarginTop}");
            }

            if (!string.IsNullOrWhiteSpace(settings?.MarginBottom))
            {
                layoutStyles.Append($" margin-bottom:{settings?.MarginBottom}");
            }

            if (!string.IsNullOrWhiteSpace(settings?.MarginLeft))
            {
                layoutStyles.Append($" margin-left:{settings?.MarginLeft}");
            }

            if (!string.IsNullOrWhiteSpace(settings?.MarginRight))
            {
                layoutStyles.Append($" margin-right:{settings?.MarginRight}");
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

            return layoutClasses.ToString();
        }
    }
}