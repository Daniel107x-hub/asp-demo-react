using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Todo.Core.Entities
{
    public class Category
    {
        public Category(string name, string description, int userId){
            this.name = name;
            this.description = description;
            this.userId = userId;
            this.createdAt = DateTime.Now;
            this.updatedAt = DateTime.Now;
        }

        [Key]
        public int categoryId { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public DateTime createdAt { get; set; }
        public DateTime updatedAt { get; set; }
        public string? color { get; set; }
        public string? icon { get; set; }   
        public int userId { get; set; }
        public User user { get; } = null!; // Required reference navigation
    }
}