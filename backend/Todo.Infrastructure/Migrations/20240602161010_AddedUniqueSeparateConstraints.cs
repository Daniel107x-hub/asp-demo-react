using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Todo.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddedUniqueSeparateConstraints : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_User_userName_email",
                table: "User");

            migrationBuilder.CreateIndex(
                name: "IX_User_email",
                table: "User",
                column: "email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_User_userName",
                table: "User",
                column: "userName",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_User_email",
                table: "User");

            migrationBuilder.DropIndex(
                name: "IX_User_userName",
                table: "User");

            migrationBuilder.CreateIndex(
                name: "IX_User_userName_email",
                table: "User",
                columns: new[] { "userName", "email" },
                unique: true);
        }
    }
}
