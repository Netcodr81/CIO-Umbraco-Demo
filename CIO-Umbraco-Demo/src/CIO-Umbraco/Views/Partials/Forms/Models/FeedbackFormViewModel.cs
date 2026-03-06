using System.ComponentModel.DataAnnotations;

namespace CIO_Umbraco_Demo.Views.Partials.Forms.Models;

public class FeedbackFormViewModel
{
    public required string FormId { get; set; }
    public string? SuccessMessage { get; set; }
    public string? Name { get; set; }
    public string? Email { get; set; }

    [Required(ErrorMessage = "Feedback is required.")]
    [MaxLength(400, ErrorMessage = "Feedback cannot exceed 400 characters.")]
    public string? Feedback { get; set; }
}