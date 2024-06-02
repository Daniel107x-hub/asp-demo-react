using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Todo.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddedUserReferences : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Priority_userId",
                table: "Priority",
                column: "userId");

            migrationBuilder.CreateIndex(
                name: "IX_Category_userId",
                table: "Category",
                column: "userId");

            migrationBuilder.AddForeignKey(
                name: "FK_Category_User_userId",
                table: "Category",
                column: "userId",
                principalTable: "User",
                principalColumn: "userId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Priority_User_userId",
                table: "Priority",
                column: "userId",
                principalTable: "User",
                principalColumn: "userId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Category_User_userId",
                table: "Category");

            migrationBuilder.DropForeignKey(
                name: "FK_Priority_User_userId",
                table: "Priority");

            migrationBuilder.DropIndex(
                name: "IX_Priority_userId",
                table: "Priority");

            migrationBuilder.DropIndex(
                name: "IX_Category_userId",
                table: "Category");
        }
    }
}
