using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Todo.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddedKeys : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CategoryTask");

            migrationBuilder.DropTable(
                name: "Task");

            migrationBuilder.CreateTable(
                name: "TaskItem",
                columns: table => new
                {
                    taskId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    title = table.Column<string>(type: "text", nullable: false),
                    description = table.Column<string>(type: "text", nullable: true),
                    createdAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    updatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    dueDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    isCompleted = table.Column<bool>(type: "boolean", nullable: false),
                    isCancelled = table.Column<bool>(type: "boolean", nullable: false),
                    isDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    priorityId = table.Column<int>(type: "integer", nullable: true),
                    userId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaskItem", x => x.taskId);
                    table.ForeignKey(
                        name: "FK_TaskItem_Priority_priorityId",
                        column: x => x.priorityId,
                        principalTable: "Priority",
                        principalColumn: "priorityId");
                    table.ForeignKey(
                        name: "FK_TaskItem_User_userId",
                        column: x => x.userId,
                        principalTable: "User",
                        principalColumn: "userId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CategoryTaskItem",
                columns: table => new
                {
                    TaskItemtaskId = table.Column<int>(type: "integer", nullable: false),
                    categoriescategoryId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CategoryTaskItem", x => new { x.TaskItemtaskId, x.categoriescategoryId });
                    table.ForeignKey(
                        name: "FK_CategoryTaskItem_Category_categoriescategoryId",
                        column: x => x.categoriescategoryId,
                        principalTable: "Category",
                        principalColumn: "categoryId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CategoryTaskItem_TaskItem_TaskItemtaskId",
                        column: x => x.TaskItemtaskId,
                        principalTable: "TaskItem",
                        principalColumn: "taskId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CategoryTaskItem_categoriescategoryId",
                table: "CategoryTaskItem",
                column: "categoriescategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_TaskItem_priorityId",
                table: "TaskItem",
                column: "priorityId");

            migrationBuilder.CreateIndex(
                name: "IX_TaskItem_userId",
                table: "TaskItem",
                column: "userId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CategoryTaskItem");

            migrationBuilder.DropTable(
                name: "TaskItem");

            migrationBuilder.CreateTable(
                name: "Task",
                columns: table => new
                {
                    taskId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    priorityId = table.Column<int>(type: "integer", nullable: true),
                    userId = table.Column<int>(type: "integer", nullable: false),
                    createdAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    description = table.Column<string>(type: "text", nullable: true),
                    dueDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    isCancelled = table.Column<bool>(type: "boolean", nullable: false),
                    isCompleted = table.Column<bool>(type: "boolean", nullable: false),
                    isDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    title = table.Column<string>(type: "text", nullable: false),
                    updatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Task", x => x.taskId);
                    table.ForeignKey(
                        name: "FK_Task_Priority_priorityId",
                        column: x => x.priorityId,
                        principalTable: "Priority",
                        principalColumn: "priorityId");
                    table.ForeignKey(
                        name: "FK_Task_User_userId",
                        column: x => x.userId,
                        principalTable: "User",
                        principalColumn: "userId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CategoryTask",
                columns: table => new
                {
                    categoriescategoryId = table.Column<int>(type: "integer", nullable: false),
                    taskId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CategoryTask", x => new { x.categoriescategoryId, x.taskId });
                    table.ForeignKey(
                        name: "FK_CategoryTask_Category_categoriescategoryId",
                        column: x => x.categoriescategoryId,
                        principalTable: "Category",
                        principalColumn: "categoryId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CategoryTask_Task_taskId",
                        column: x => x.taskId,
                        principalTable: "Task",
                        principalColumn: "taskId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CategoryTask_taskId",
                table: "CategoryTask",
                column: "taskId");

            migrationBuilder.CreateIndex(
                name: "IX_Task_priorityId",
                table: "Task",
                column: "priorityId");

            migrationBuilder.CreateIndex(
                name: "IX_Task_userId",
                table: "Task",
                column: "userId");
        }
    }
}
