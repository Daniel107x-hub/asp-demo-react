using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace Todo.Core.Entities
{
    public class Priority
    {
        public Priority(int level, int userId){
            this.level = level;
            this.userId = userId;
        }

        [Key]
        public int priorityId { get; set; }
        public int level { get; set; }
        public string? color { get; set; }
        public string? icon { get; set; }
        public int userId { get; set; }
        public User user { get; } = null!; // Required reference navigation
        public ICollection<TaskItem> tasks { get; } = new List<TaskItem>();
    }
}