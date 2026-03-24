namespace NEOCIO.Umbraco.Core.Extensions;

public static class PaddingExtensions
{
    public static string ToPaddingTopClass(this string? padding)
    {
        if (padding == null)
            return "pt-0";

        return padding switch
        {
            "None" => "pt-0",
            "Small" => "pt-3",
            "Medium" => "pt-4",
            "Large" => "pt-5",
            "XL" => "pt-6",
            _ => "pt-0"
        };
    }

    public static string ToPaddingBottomClass(this string? padding)
    {
        if (padding == null)
            return "pb-0";

        return padding switch
        {
            "None" => "pb-0",
            "Small" => "pb-3",
            "Medium" => "pb-4",
            "Large" => "pb-5",
            "XL" => "pb-6",
            _ => "pb-0"
        };
    }

    public static string ToPaddingLeftClass(this string? padding)
    {
        if (padding == null)
            return "ps-0";

        return padding switch
        {
            "None" => "ps-0",
            "Small" => "ps-3",
            "Medium" => "ps-4",
            "Large" => "ps-5",
            "XL" => "ps-6",
            _ => "ps-0"
        };
    }

    public static string ToPaddingRightClass(this string? padding)
    {
        if (padding == null)
            return "pe-0";

        return padding switch
        {
            "None" => "pe-0",
            "Small" => "pe-3",
            "Medium" => "pe-4",
            "Large" => "pe-5",
            "XL" => "pe-6",
            _ => "pe-0"
        };
    }


}