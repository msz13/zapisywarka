using Microsoft.EntityFrameworkCore.Migrations;
using NodaTime;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace OffersBD.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "offers");

            migrationBuilder.CreateTable(
                name: "CatalogCategories",
                schema: "offers",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    TenantId = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CatalogCategories", x => x.Id);
                    table.UniqueConstraint("AK_CatalogCategories_Id_TenantId", x => new { x.Id, x.TenantId });
                });

            migrationBuilder.CreateTable(
                name: "Offers",
                schema: "offers",
                columns: table => new
                {
                    TenantId = table.Column<string>(nullable: false),
                    Id = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    EndRegistrationDate = table.Column<LocalDateTime>(nullable: false),
                    StartCollectionDate = table.Column<LocalDateTime>(nullable: false),
                    EndCollectionDate = table.Column<LocalDateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Offers", x => new { x.Id, x.TenantId });
                });

            migrationBuilder.CreateTable(
                name: "CatalogItems",
                schema: "offers",
                columns: table => new
                {
                    TenantId = table.Column<string>(nullable: false),
                    Id = table.Column<int>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    CategoryId = table.Column<int>(nullable: true),
                    Price = table.Column<decimal>(nullable: true),
                    AvaibleQuantity = table.Column<int>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CatalogItems", x => new { x.Id, x.TenantId });
                    table.ForeignKey(
                        name: "FK_CatalogItems_CatalogCategories_CategoryId_TenantId",
                        columns: x => new { x.CategoryId, x.TenantId },
                        principalSchema: "offers",
                        principalTable: "CatalogCategories",
                        principalColumns: new[] { "Id", "TenantId" },
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "OfferItems",
                schema: "offers",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CatalogItemId = table.Column<int>(nullable: false),
                    Price = table.Column<decimal>(nullable: false),
                    Quantity = table.Column<int>(nullable: false),
                    OfferId = table.Column<string>(nullable: true),
                    OfferTenantId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OfferItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OfferItems_Offers_OfferId_OfferTenantId",
                        columns: x => new { x.OfferId, x.OfferTenantId },
                        principalSchema: "offers",
                        principalTable: "Offers",
                        principalColumns: new[] { "Id", "TenantId" },
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_OfferItems_CatalogItems_CatalogItemId_OfferTenantId",
                        columns: x => new { x.CatalogItemId, x.OfferTenantId },
                        principalSchema: "offers",
                        principalTable: "CatalogItems",
                        principalColumns: new[] { "Id", "TenantId" },
                        onDelete: ReferentialAction.Restrict);
                       
                });

            migrationBuilder.CreateIndex(
                name: "IX_CatalogItems_CategoryId_TenantId",
                schema: "offers",
                table: "CatalogItems",
                columns: new[] { "CategoryId", "TenantId" });

            migrationBuilder.CreateIndex(
                name: "IX_OfferItems_OfferId_OfferTenantId",
                schema: "offers",
                table: "OfferItems",
                columns: new[] { "OfferId", "OfferTenantId" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CatalogItems",
                schema: "offers");

            migrationBuilder.DropTable(
                name: "OfferItems",
                schema: "offers");

            migrationBuilder.DropTable(
                name: "CatalogCategories",
                schema: "offers");

            migrationBuilder.DropTable(
                name: "Offers",
                schema: "offers");
        }
    }
}
