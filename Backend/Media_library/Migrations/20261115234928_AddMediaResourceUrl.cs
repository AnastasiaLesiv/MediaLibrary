using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Media_library.Migrations
{
    /// <inheritdoc />
    public partial class AddMediaResourceUrl : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ResourceUrl",
                table: "Videos",
                type: "nvarchar(2048)",
                maxLength: 2048,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ResourceUrl",
                table: "Images",
                type: "nvarchar(2048)",
                maxLength: 2048,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ResourceUrl",
                table: "Ebooks",
                type: "nvarchar(2048)",
                maxLength: 2048,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ResourceUrl",
                table: "Audios",
                type: "nvarchar(2048)",
                maxLength: 2048,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ResourceUrl",
                table: "Videos");

            migrationBuilder.DropColumn(
                name: "ResourceUrl",
                table: "Images");

            migrationBuilder.DropColumn(
                name: "ResourceUrl",
                table: "Ebooks");

            migrationBuilder.DropColumn(
                name: "ResourceUrl",
                table: "Audios");
        }
    }
}
