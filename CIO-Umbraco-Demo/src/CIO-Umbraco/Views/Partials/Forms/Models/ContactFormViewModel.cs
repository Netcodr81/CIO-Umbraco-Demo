using System.ComponentModel.DataAnnotations;

namespace CIOUmbracoDemo.Views.Partials.Forms.Models;

public class ContactFormViewModel
{
    public required string FormId { get; set; }
    public string? SuccessMessage { get; set; }

    [Required(ErrorMessage = "First name is required")]
    public string? FirstName { get; set; }

    [Required(ErrorMessage = "Last name is required")]
    public string? LastName { get; set; }

    [EmailAddress(ErrorMessage = "Invalid email address")]
    [Required(ErrorMessage = "Email is required")]
    public string? Email { get; set; }

    [Required(ErrorMessage = "Message is required")]
    [MaxLength(400, ErrorMessage = "Message cannot exceed 400 characters")]

    public string? Message { get; set; }
}