using Microsoft.EntityFrameworkCore.Migrations;

namespace OffersBD.Migrations
{
    public partial class CatalogItemFK : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "TenantId",
                schema: "offers",
                table: "OfferItems",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TenantId",
                schema: "offers",
                table: "OfferItems");
        }
    }
}
