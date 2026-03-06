using Microsoft.EntityFrameworkCore;
using Models_Umbraco_Demo.Views.Partials.Forms.Data.Models;

namespace CIO_Umbraco_Demo.Views.Partials.Forms.Data;

public class FormsDbContext(DbContextOptions<FormsDbContext> options) : DbContext(options)
{
    public DbSet<ContactForm> ContactForms { get; set; }

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
    }
}