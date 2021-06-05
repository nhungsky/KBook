using Microsoft.EntityFrameworkCore.Migrations;

namespace ASPCore.Angular.Migrations
{
    public partial class UpdateLocationCategory_2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Places_PlaceCategory_PlaceCategoryId",
                table: "Places");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PlaceCategory",
                table: "PlaceCategory");

            migrationBuilder.RenameTable(
                name: "PlaceCategory",
                newName: "PlaceCategories");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PlaceCategories",
                table: "PlaceCategories",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Places_PlaceCategories_PlaceCategoryId",
                table: "Places",
                column: "PlaceCategoryId",
                principalTable: "PlaceCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Places_PlaceCategories_PlaceCategoryId",
                table: "Places");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PlaceCategories",
                table: "PlaceCategories");

            migrationBuilder.RenameTable(
                name: "PlaceCategories",
                newName: "PlaceCategory");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PlaceCategory",
                table: "PlaceCategory",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Places_PlaceCategory_PlaceCategoryId",
                table: "Places",
                column: "PlaceCategoryId",
                principalTable: "PlaceCategory",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
