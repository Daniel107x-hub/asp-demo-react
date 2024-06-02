using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Xml.Serialization;

namespace Todo.Core.Entities
{
    public class TaskItem
    {
        public TaskItem(string title, int userId){
            this.title = title;
            this.userId = userId;
            this.createdAt = DateTime.Now;
            this.updatedAt = DateTime.Now;
        }

        [Key]
        public int taskId { get; set; }
        public string title { get; set; }
        public string? description { get; set; }
        public DateTime createdAt { get; set; }
        public DateTime updatedAt { get; set; }
        public DateTime dueDate { get; set; }
        public bool isCompleted { get; set; }
        public bool isCancelled { get; set; }
        public bool isDeleted { get; set; }
        public int? priorityId { get; set; }
        public Priority? priority { get; set; }
        public int userId { get; set; }
        public User user { get; set; } = null!; // Required reference navigation
        public ICollection<Category> categories { get; } = new List<Category>();
    }
}