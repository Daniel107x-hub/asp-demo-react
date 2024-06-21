using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Todo.Api.Models
{
    public class UserDTO
    {
        public string? userName { get; set; }
        public string? email { get; set; }
        public string? phoneNumber { get; set; }
    }
}