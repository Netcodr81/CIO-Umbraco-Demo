namespace CIO_Umbraco_Demo.Views.Partials.Forms.Data.Models;

public class ReportProblemForm
{
    public required string FormId { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? PhoneNumber { get; set; }
    public string? Email { get; set; }
    public string? Agency { get; set; }
    public string? DescriptionOfProblem { get; set; }
    public DateTimeOffset SubmittedOn { get; set; }
}