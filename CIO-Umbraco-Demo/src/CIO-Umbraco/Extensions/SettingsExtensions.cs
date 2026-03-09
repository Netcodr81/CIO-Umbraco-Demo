using System.Text;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Web.Common.PublishedModels;

namespace CIOUmbracoDemo.Extensions;

public static class SettingsExtensions
{
    public static string GenerateBlockSettingsClasses(this IPublishedElement element)
    {
        var classes = new StringBuilder();

        if (element is null)
        {
            return string.Empty;
        }

        // Get the settings from the element
        var settings = element as BlockSettings;

        if (settings == null)
        {
            return string.Empty;
        }

        // Margins
        var marginTop = settings.MarginTop;
        if (!string.IsNullOrWhiteSpace(marginTop))
        {
            classes.Append($" {marginTop.ToMarginTopClass()}");
        }

        var marginBottom = settings.MarginBottom;
        if (!string.IsNullOrWhiteSpace(marginBottom))
        {
            classes.Append($" {marginBottom.ToMarginBottomClass()}");
        }

        var marginRight = settings.MarginRight;
        if (!string.IsNullOrWhiteSpace(marginRight))
        {
            classes.Append($" {marginRight.ToMarginRightClass()}");
        }

        var marginLeft = settings.MarginLeft;
        if (!string.IsNullOrWhiteSpace(marginLeft))
        {
            classes.Append($" {marginLeft.ToMarginLeftClass()}");
        }

        // Paddings
        var paddingTop = settings.PaddingTop;
        if (!string.IsNullOrWhiteSpace(paddingTop))
        {
            classes.Append($" {paddingTop.ToPaddingTopClass()}");
        }

        var paddingBottom = settings.PaddingBottom;
        if (!string.IsNullOrWhiteSpace(paddingBottom))
        {
            classes.Append($" {paddingBottom.ToPaddingBottomClass()}");
        }

        var paddingRight = settings.PaddingRight;
        if (!string.IsNullOrWhiteSpace(paddingRight))
        {
            classes.Append($" {paddingRight.ToPaddingRightClass()}");
        }

        var paddingLeft = settings.PaddingLeft;
        if (!string.IsNullOrWhiteSpace(paddingLeft))
        {
            classes.Append($" {paddingLeft.ToPaddingLeftClass()}");
        }

        return classes.ToString();
    }
}
