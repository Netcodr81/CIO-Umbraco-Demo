using System.ComponentModel.DataAnnotations;

namespace CIO_Umbraco_Demo.Views.Partials.Forms.Models;

public class ServiceRequestFormViewModel
{
    public required string FormId { get; set; }
    public string? SuccessMessage { get; set; }

    [Required(ErrorMessage = "First name is required")]
    public string? FirstName { get; set; }

    [Required(ErrorMessage = "Last name is required")]
    public string? LastName { get; set; }

    [Required(ErrorMessage = "Phone number is required")]
    public string? PhoneNumber { get; set; }

    [EmailAddress(ErrorMessage = "Invalid email address")]
    [Required(ErrorMessage = "Email is required")]
    public string? Email { get; set; }

    [Required(ErrorMessage = "Agency is required")]
    public string? Agency { get; set; }

    [Required(ErrorMessage = "Description of service requested is required")]
    [MaxLength(400, ErrorMessage = "Description of service requested cannot exceed 400 characters")]
    public string? DescriptionServiceRequested { get; set; }
}