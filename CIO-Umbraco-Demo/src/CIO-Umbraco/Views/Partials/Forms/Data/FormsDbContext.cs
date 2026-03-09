using CIOUmbracoDemo.Views.Partials.Forms.Data.Models;
using Microsoft.EntityFrameworkCore;
using ContactForm = CIOUmbracoDemo.Views.Partials.Forms.Data.Models.ContactForm;

namespace CIOUmbracoDemo.Views.Partials.Forms.Data;

public class FormsDbContext(DbContextOptions<FormsDbContext> options) : DbContext(options)
{
    public DbSet<ContactForm> ContactForms { get; set; }
    public DbSet<ServiceRequestForm> ServiceRequestForms { get; set; }
    public DbSet<ReportProblemForm> ReportProblemForms { get; set; }
    public DbSet<FeedbackForm> FeedbackForms { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {

        modelBuilder.Entity<ContactForm>(entity =>
        {
            entity.ToTable("contactForms", "forms");
            entity.HasKey(e => e.FormId);
            entity.Property(e => e.FirstName)
                .IsRequired()
                .HasMaxLength(100);
            entity.Property(e => e.LastName)
                .IsRequired()
                .HasMaxLength(100);
            entity.Property(e => e.Email)
                .IsRequired()
                .HasMaxLength(255);
            entity.Property(e => e.Message)
                .IsRequired()
                .HasMaxLength(400);
            entity.Property(e => e.SubmittedOn)
                .IsRequired();
        });

        modelBuilder.Entity<ReportProblemForm>(entity =>
        {
            entity.ToTable("reportProblemForms", "forms");
            entity.HasKey(e => e.FormId);
            entity.Property(e => e.FirstName)
                .IsRequired()
                .HasMaxLength(100);
            entity.Property(e => e.LastName)
                .IsRequired()
                .HasMaxLength(100);
            entity.Property(e => e.PhoneNumber)
                .IsRequired();
            entity.Property(e => e.Email)
                .IsRequired()
                .HasMaxLength(255);
            entity.Property(e => e.Agency)
                .IsRequired()
                .HasMaxLength(100);
            entity.Property(e => e.DescriptionOfProblem)
                .IsRequired()
                .HasMaxLength(400);
            entity.Property(e => e.SubmittedOn)
                .IsRequired();
        });

        modelBuilder.Entity<ServiceRequestForm>(entity =>
        {
            entity.ToTable("requestServiceForms", "forms");
            entity.HasKey(e => e.FormId);
            entity.Property(e => e.FirstName)
                .IsRequired()
                .HasMaxLength(100);
            entity.Property(e => e.LastName)
                .IsRequired()
                .HasMaxLength(100);
            entity.Property(e => e.PhoneNumber)
                .IsRequired();
            entity.Property(e => e.Email)
                .IsRequired()
                .HasMaxLength(255);
            entity.Property(e => e.Agency)
                .IsRequired()
                .HasMaxLength(100);
            entity.Property(e => e.DescriptionServiceRequested)
                .IsRequired()
                .HasMaxLength(400);
            entity.Property(e => e.SubmittedOn)
                .IsRequired();
        });

        modelBuilder.Entity<FeedbackForm>(entity =>
        {
            entity.ToTable("feedbackForms", "forms");
            entity.HasKey(e => e.FormId);
            entity.Property(e => e.Name);
            entity.Property(e => e.Email);
            entity.Property(e => e.Feedback)
                .IsRequired()
                .HasMaxLength(400);
            entity.Property(e => e.SubmittedOn)
                .IsRequired();
        });
    }
}