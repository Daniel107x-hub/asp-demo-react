using Microsoft.EntityFrameworkCore;
using Todo.Core.Entities;

namespace Todo.Infrastructure.Data
{
    public class TodoContext : DbContext
    {
        public DbSet<User> User { get; set; }
        public DbSet<TaskItem> TaskItem { get; set; }
        public DbSet<Category> Category { get; set; }
        public DbSet<Priority> Priority { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder.UseNpgsql("Host=localhost;Database=postgres;Username=postgres;Password=postgres");

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<TaskItem>()
                .HasMany(e => e.categories)
                .WithMany();

            builder.Entity<User>()
                .HasIndex(e => e.userName)
                .IsUnique(true);

            builder.Entity<User>()
                .HasIndex(e => e.email)
                .IsUnique(true);
        }
    
    }
}