using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CIOUmbracoDemo.Migrations
{
    /// <inheritdoc />
    public partial class Requestaserviceandreportaproblemformtablesadded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "reportProblemForms",
                schema: "forms",
                columns: table => new
                {
                    FormId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Agency = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    DescriptionOfProblem = table.Column<string>(type: "nvarchar(400)", maxLength: 400, nullable: false),
                    SubmittedOn = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_reportProblemForms", x => x.FormId);
                });

            migrationBuilder.CreateTable(
                name: "requestServiceForms",
                schema: "forms",
                columns: table => new
                {
                    FormId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Agency = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    DescriptionServiceRequested = table.Column<string>(type: "nvarchar(400)", maxLength: 400, nullable: false),
                    SubmittedOn = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_requestServiceForms", x => x.FormId);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "reportProblemForms",
                schema: "forms");

            migrationBuilder.DropTable(
                name: "requestServiceForms",
                schema: "forms");
        }
    }
}
