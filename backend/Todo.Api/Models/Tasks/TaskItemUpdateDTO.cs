using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Todo.Core.Entities;

namespace Todo.Api.Models
{
    public class TaskItemUpdateDTO
    {
        public required string title { get; set; }
        public string? description { get; set; }

    }
}