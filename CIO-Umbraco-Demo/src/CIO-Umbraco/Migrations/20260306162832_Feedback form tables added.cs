using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CIOUmbracoDemo.Migrations
{
    /// <inheritdoc />
    public partial class Feedbackformtablesadded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "feedbackForms",
                schema: "forms",
                columns: table => new
                {
                    FormId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Feedback = table.Column<string>(type: "nvarchar(400)", maxLength: 400, nullable: false),
                    SubmittedOn = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_feedbackForms", x => x.FormId);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "feedbackForms",
                schema: "forms");
        }
    }
}
