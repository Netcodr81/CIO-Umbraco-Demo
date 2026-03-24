using System.Text;
using Umbraco.Cms.Core.Models.PublishedContent;

namespace NEOCIO.Umbraco.Core.Extensions;

public static class SettingsExtensions
{
    public static string GenerateBlockSettingsClasses(this IPublishedElement element)
    {
        if (element is null)
            return string.Empty;

        var classes = new StringBuilder();

        // Margins
        var marginTop = element.Value<string>("marginTop");
        if (!string.IsNullOrWhiteSpace(marginTop))
            classes.Append($" {marginTop.ToMarginTopClass()}");

        var marginBottom = element.Value<string>("marginBottom");
        if (!string.IsNullOrWhiteSpace(marginBottom))
            classes.Append($" {marginBottom.ToMarginBottomClass()}");

        var marginRight = element.Value<string>("marginRight");
        if (!string.IsNullOrWhiteSpace(marginRight))
            classes.Append($" {marginRight.ToMarginRightClass()}");

        var marginLeft = element.Value<string>("marginLeft");
        if (!string.IsNullOrWhiteSpace(marginLeft))
            classes.Append($" {marginLeft.ToMarginLeftClass()}");

        // Paddings
        var paddingTop = element.Value<string>("paddingTop");
        if (!string.IsNullOrWhiteSpace(paddingTop))
            classes.Append($" {paddingTop.ToPaddingTopClass()}");

        var paddingBottom = element.Value<string>("paddingBottom");
        if (!string.IsNullOrWhiteSpace(paddingBottom))
            classes.Append($" {paddingBottom.ToPaddingBottomClass()}");

        var paddingRight = element.Value<string>("paddingRight");
        if (!string.IsNullOrWhiteSpace(paddingRight))
            classes.Append($" {paddingRight.ToPaddingRightClass()}");

        var paddingLeft = element.Value<string>("paddingLeft");
        if (!string.IsNullOrWhiteSpace(paddingLeft))
            classes.Append($" {paddingLeft.ToPaddingLeftClass()}");

        return classes.ToString();
    }


}
