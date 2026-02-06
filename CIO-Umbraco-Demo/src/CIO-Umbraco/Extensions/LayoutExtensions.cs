using Umbraco.Cms.Core.Models.Blocks;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Web.Common.PublishedModels;

namespace CIO_Umbraco.Extensions;

public static class LayoutExtensions
{
    public static string GenerateLayoutSpacingStyles(this Section content)
    {
        string? paddingTop = content.TopPadding;
        string? paddingRight = content.RightPadding;
        string? paddingBottom = content.BottomPadding;
        string? paddingLeft = content.LeftPadding;

        string? marginTop = content.TopMargin;
        string? marginRight = content.RightMargin;
        string? marginBottom = content.BottomMargin;
        string? marginLeft = content.LeftMargin;

        static bool HasValue(string? v) => !string.IsNullOrWhiteSpace(v);

        string BuildBoxStyle(string? top, string? right, string? bottom, string? left, string prop)
        {
            // all four -> try shorthand
            if (HasValue(top) && HasValue(right) && HasValue(bottom) && HasValue(left))
            {
                // if all equal use single value
                if (top == right && top == bottom && top == left) return $"{prop}: {top};";
                // if top/bottom and left/right pairs equal use two-value shorthand
                if (top == bottom && right == left) return $"{prop}: {top} {right};";
                // if top, left/right, bottom -> three-value shorthand
                if (right == left) return $"{prop}: {top} {right} {bottom};";
                // else full shorthand
                return $"{prop}: {top} {right} {bottom} {left};";
            }

            // fall back to individual emitted properties
            var parts = new List<string>();
            if (HasValue(top)) parts.Add($"{prop}-top: {top};");
            if (HasValue(right)) parts.Add($"{prop}-right: {right};");
            if (HasValue(bottom)) parts.Add($"{prop}-bottom: {bottom};");
            if (HasValue(left)) parts.Add($"{prop}-left: {left};");
            return string.Join(" ", parts);
        }

        var paddingStyle = BuildBoxStyle(paddingTop, paddingRight, paddingBottom, paddingLeft, "padding");
        var marginStyle = BuildBoxStyle(marginTop, marginRight, marginBottom, marginLeft, "margin");

        var styleAttr = string.Join(" ", new[] { paddingStyle, marginStyle }.Where(s => !string.IsNullOrWhiteSpace(s)));

        return styleAttr;
    }

    public static string GenerateLayoutSpacingStyles(this ContentPage content)
    {
        string? paddingTop = content.TopPadding;
        string? paddingRight = content.RightPadding;
        string? paddingBottom = content.BottomPadding;
        string? paddingLeft = content.LeftPadding;

        string? marginTop = content.TopMargin;
        string? marginRight = content.RightMargin;
        string? marginBottom = content.BottomMargin;
        string? marginLeft = content.LeftMargin;

        static bool HasValue(string? v) => !string.IsNullOrWhiteSpace(v);

        string BuildBoxStyle(string? top, string? right, string? bottom, string? left, string prop)
        {
            // all four -> try shorthand
            if (HasValue(top) && HasValue(right) && HasValue(bottom) && HasValue(left))
            {
                // if all equal use single value
                if (top == right && top == bottom && top == left) return $"{prop}: {top};";
                // if top/bottom and left/right pairs equal use two-value shorthand
                if (top == bottom && right == left) return $"{prop}: {top} {right};";
                // if top, left/right, bottom -> three-value shorthand
                if (right == left) return $"{prop}: {top} {right} {bottom};";
                // else full shorthand
                return $"{prop}: {top} {right} {bottom} {left};";
            }

            // fall back to individual emitted properties
            var parts = new List<string>();
            if (HasValue(top)) parts.Add($"{prop}-top: {top};");
            if (HasValue(right)) parts.Add($"{prop}-right: {right};");
            if (HasValue(bottom)) parts.Add($"{prop}-bottom: {bottom};");
            if (HasValue(left)) parts.Add($"{prop}-left: {left};");
            return string.Join(" ", parts);
        }

        var paddingStyle = BuildBoxStyle(paddingTop, paddingRight, paddingBottom, paddingLeft, "padding");
        var marginStyle = BuildBoxStyle(marginTop, marginRight, marginBottom, marginLeft, "margin");

        var styleAttr = string.Join(" ", new[] { paddingStyle, marginStyle }.Where(s => !string.IsNullOrWhiteSpace(s)));

        return styleAttr;
    }

    public static string GenerateLayoutSpacingStyles(this IPublishedElement content)
    {
        string? paddingTop = content.Value<string>("topPadding");
        string? paddingRight = content.Value<string>("rightPadding");
        string? paddingBottom = content.Value<string>("bottomPadding");
        string? paddingLeft = content.Value<string>("leftPadding");

        string? marginTop = content.Value<string>("topMargin");
        string? marginRight = content.Value<string>("rightMargin");
        string? marginBottom = content.Value<string>("bottomMargin");
        string? marginLeft = content.Value<string>("leftMargin");

        static bool HasValue(string? v) => !string.IsNullOrWhiteSpace(v);

        string BuildBoxStyle(string? top, string? right, string? bottom, string? left, string prop)
        {
            // all four -> try shorthand
            if (HasValue(top) && HasValue(right) && HasValue(bottom) && HasValue(left))
            {
                // if all equal use single value
                if (top == right && top == bottom && top == left) return $"{prop}: {top};";
                // if top/bottom and left/right pairs equal use two-value shorthand
                if (top == bottom && right == left) return $"{prop}: {top} {right};";
                // if top, left/right, bottom -> three-value shorthand
                if (right == left) return $"{prop}: {top} {right} {bottom};";
                // else full shorthand
                return $"{prop}: {top} {right} {bottom} {left};";
            }

            // fall back to individual emitted properties
            var parts = new List<string>();
            if (HasValue(top)) parts.Add($"{prop}-top: {top};");
            if (HasValue(right)) parts.Add($"{prop}-right: {right};");
            if (HasValue(bottom)) parts.Add($"{prop}-bottom: {bottom};");
            if (HasValue(left)) parts.Add($"{prop}-left: {left};");
            return string.Join(" ", parts);
        }

        var paddingStyle = BuildBoxStyle(paddingTop, paddingRight, paddingBottom, paddingLeft, "padding");
        var marginStyle = BuildBoxStyle(marginTop, marginRight, marginBottom, marginLeft, "margin");

        var styleAttr = string.Join(" ", new[] { paddingStyle, marginStyle }.Where(s => !string.IsNullOrWhiteSpace(s)));

        return styleAttr;
    }
}
