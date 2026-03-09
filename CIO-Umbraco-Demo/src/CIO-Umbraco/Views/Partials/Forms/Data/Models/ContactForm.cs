namespace CIOUmbracoDemo.Views.Partials.Forms.Data.Models
{
    public class ContactForm
    {
        public required string FormId { get; set; }

        public string? FirstName { get; set; }

        public string? LastName { get; set; }

        public string? Email { get; set; }

        public string? Message { get; set; }

        public DateTimeOffset SubmittedOn { get; set; }
    }
}