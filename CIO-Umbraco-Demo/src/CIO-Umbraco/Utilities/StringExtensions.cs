namespace CIOUmbracoDemo.Utilities;

public static class StringExtensions
{
    public static string Capitalize(this string input)
    {
        if (string.IsNullOrEmpty(input)) return input;
        return $"{input[0].ToString().ToUpper()}{input.Substring(1)}";
    }
}
