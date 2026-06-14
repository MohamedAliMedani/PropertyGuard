using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PropertyGuard.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddPackageExpertRoleAndEstimatedDays : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "EstimatedDays",
                table: "ServicePackages",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "RequiredExpertRole",
                table: "ServicePackages",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EstimatedDays",
                table: "ServicePackages");

            migrationBuilder.DropColumn(
                name: "RequiredExpertRole",
                table: "ServicePackages");
        }
    }
}
