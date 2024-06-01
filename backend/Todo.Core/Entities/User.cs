using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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

        public int userId { get; set; }
        public string userName { get; set; }
        public string password { get; set; }
        public string email { get; set; }
        public DateTime createdAt { get; set; }
        public DateTime updatedAt { get; set; }
    }
}