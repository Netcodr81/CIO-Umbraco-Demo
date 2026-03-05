using Microsoft.EntityFrameworkCore;

namespace CIO_Umbraco_Demo.Views.Partials.Forms.Data;

public class FormsDbContext(DbContextOptions<FormsDbContext> options) : DbContext(options)
{

}