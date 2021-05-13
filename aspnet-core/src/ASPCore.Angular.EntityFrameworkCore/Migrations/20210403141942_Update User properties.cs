using Microsoft.EntityFrameworkCore.Migrations;

namespace ASPCore.Angular.Migrations
{
    public partial class UpdateUserproperties : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "LockReason",
                table: "AbpUsers",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LockReason",
                table: "AbpUsers");
        }
    }
}
