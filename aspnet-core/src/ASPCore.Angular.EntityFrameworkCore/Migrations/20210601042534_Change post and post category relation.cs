using Microsoft.EntityFrameworkCore.Migrations;

namespace ASPCore.Angular.Migrations
{
    public partial class Changepostandpostcategoryrelation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PostCategoryId",
                table: "Posts",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Posts_PostCategoryId",
                table: "Posts",
                column: "PostCategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Posts_PostCategories_PostCategoryId",
                table: "Posts",
                column: "PostCategoryId",
                principalTable: "PostCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Posts_PostCategories_PostCategoryId",
                table: "Posts");

            migrationBuilder.DropIndex(
                name: "IX_Posts_PostCategoryId",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "PostCategoryId",
                table: "Posts");
        }
    }
}
