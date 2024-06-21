using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Xml.Serialization;
using Microsoft.AspNetCore.Identity;

namespace Todo.Core.Entities
{
    public class TaskItem
    {
        [Key]
        public int taskId { get; set; }
        public required string title { get; set; }
        public string? description { get; set; }
        public DateTime createdAt { get; set; } = DateTime.Now;
        public DateTime updatedAt { get; set; } = DateTime.Now;
        public DateTime dueDate { get; set; }
        public bool isCompleted { get; set; }
        public bool isCancelled { get; set; }
        public bool isDeleted { get; set; }
        public int? priorityId { get; set; }
        public Priority? priority { get; set; }
        public required string userId { get; set; }
        public IdentityUser user { get; set; } = null!; // Required reference navigation
        public ICollection<Category> categories { get; } = new List<Category>();
    }
}