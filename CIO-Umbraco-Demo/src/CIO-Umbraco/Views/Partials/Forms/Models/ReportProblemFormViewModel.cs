using System.ComponentModel.DataAnnotations;

namespace CIOUmbracoDemo.Views.Partials.Forms.Models;

public class ReportProblemFormViewModel
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

    [Required(ErrorMessage = "Description of problem is required")]
    [MaxLength(400, ErrorMessage = "Description of problem cannot exceed 400 characters")]
    public string? DescriptionOfProblem { get; set; }
}