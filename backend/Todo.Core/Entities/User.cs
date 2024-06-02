using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace Todo.Core.Entities
{
    public class User
    {
        public User(string userName, string password, string email){
            this.userName = userName;
            this.password = password;
            this.email = email;
            this.createdAt = DateTime.Now;
            this.updatedAt = DateTime.Now;
        }

        [Key]
        public int userId { get; set; }
        public string userName { get; set; }
        public string password { get; set; }
        public string email { get; set; }
        public DateTime createdAt { get; set; }
        public DateTime updatedAt { get; set; }
        public ICollection<TaskItem> tasks { get; } = new List<TaskItem>();
        public ICollection<Category> categories { get; } = new List<Category>();
        public ICollection<Priority> priorities { get; } = new List<Priority>();
    }
}