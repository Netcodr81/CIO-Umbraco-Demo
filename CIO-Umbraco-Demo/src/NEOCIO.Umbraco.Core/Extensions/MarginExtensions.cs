namespace NEOCIO.Umbraco.Core.Extensions;

public static class MarginExtensions
{
    public static string ToMarginTopClass(this string? margin)
    {
        if (margin == null)
            return "mt-0";

        return margin switch
        {
            "None" => "mt-0",
            "Small" => "mt-3",
            "Medium" => "mt-4",
            "Large" => "mt-5",
            "XL" => "mt-6",
            _ => "mt-0"
        };
    }

    public static string ToMarginBottomClass(this string? margin)
    {
        if (margin == null)
            return "mb-0";

        return margin switch
        {
            "None" => "mb-0",
            "Small" => "mb-3",
            "Medium" => "mb-4",
            "Large" => "mb-5",
            "XL" => "mb-6",
            _ => "mb-0"
        };
    }

    public static string ToMarginRightClass(this string? margin)
    {
        if (margin == null)
            return "me-0";

        return margin switch
        {
            "None" => "me-0",
            "Small" => "me-3",
            "Medium" => "me-4",
            "Large" => "me-5",
            "XL" => "me-6",
            _ => "me-0"
        };
    }

    public static string ToMarginLeftClass(this string? margin)
    {
        if (margin == null)
            return "ms-0";

        return margin switch
        {
            "None" => "ms-0",
            "Small" => "ms-3",
            "Medium" => "ms-4",
            "Large" => "ms-5",
            "XL" => "ms-6",
            _ => "ms-0"
        };
    }
}
