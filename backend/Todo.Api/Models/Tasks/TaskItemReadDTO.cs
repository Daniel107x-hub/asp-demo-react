using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Todo.Core.Entities;

namespace Todo.Api.Models
{
    public class TaskItemReadDTO
    {
        public required int taskId { get; set; }
        public required string title { get; set; }
        public string? description { get; set; }
        public DateTime createdAt { get; set; }
        public DateTime updatedAt { get; set; }

    }
}