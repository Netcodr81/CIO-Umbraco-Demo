using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Extensions;

namespace NEOCIO.Umbraco.Common.Models.Accordion;

public interface IAccordion : IPublishedElement
{
    IEnumerable<IPublishedElement> Items { get; }
    string TitleColor { get; }
    string ContentColor { get; }
    string IconColor { get; }
}

public class Accordion : PublishedElementModel, IAccordion
{
    private readonly IPublishedValueFallback _publishedValueFallback;

    public Accordion(IPublishedElement content, IPublishedValueFallback publishedValueFallback)
        : base(content, publishedValueFallback)
    {
        _publishedValueFallback = publishedValueFallback;
    }

    // Pass the fallback as the second parameter
    public IEnumerable<IPublishedElement> Items =>
        this.Value<IEnumerable<IPublishedElement>>(_publishedValueFallback, "items");

    public string TitleColor =>
        this.Value<string>(_publishedValueFallback, "titleColor");

    public string ContentColor =>
        this.Value<string>(_publishedValueFallback, "contentColor");

    public string IconColor =>
        this.Value<string>(_publishedValueFallback, "iconColor");

    public bool UseTabAccordion =>
        this.Value<bool>(_publishedValueFallback, "useTabAccordion");
}
