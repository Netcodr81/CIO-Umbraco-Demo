namespace CIOUmbracoDemo.Views.Partials.Forms.Data.Models;

public class FeedbackForm
{
    public required string FormId { get; set; }
    public string? Name { get; set; }
    public string? Email { get; set; }
    public string? Feedback { get; set; }
    public DateTimeOffset SubmittedOn { get; set; }
}