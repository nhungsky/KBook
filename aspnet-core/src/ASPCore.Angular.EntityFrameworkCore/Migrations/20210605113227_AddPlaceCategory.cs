using Microsoft.EntityFrameworkCore.Migrations;

namespace ASPCore.Angular.Migrations
{
    public partial class AddPlaceCategory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PlaceCategoryId",
                table: "Places",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "PlaceCategory",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FeatureImage = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlaceCategory", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Places_PlaceCategoryId",
                table: "Places",
                column: "PlaceCategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Places_PlaceCategory_PlaceCategoryId",
                table: "Places",
                column: "PlaceCategoryId",
                principalTable: "PlaceCategory",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Places_PlaceCategory_PlaceCategoryId",
                table: "Places");

            migrationBuilder.DropTable(
                name: "PlaceCategory");

            migrationBuilder.DropIndex(
                name: "IX_Places_PlaceCategoryId",
                table: "Places");

            migrationBuilder.DropColumn(
                name: "PlaceCategoryId",
                table: "Places");
        }
    }
}
