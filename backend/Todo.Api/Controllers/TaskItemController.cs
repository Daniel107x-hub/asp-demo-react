using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Todo.Api.Models;
using Todo.Core.Entities;
using Todo.Infrastructure.Data;

namespace Todo.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TaskItemController : ControllerBase
    {
        private readonly TodoContext _context;
        private readonly UserManager<IdentityUser> _userManager;

        public TaskItemController(TodoContext context, UserManager<IdentityUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // GET: api/TaskItem
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskItemReadDTO>>> GetTaskItem()
        {
            // Convert the db tasks to dtos
            var user = await _userManager.GetUserAsync(User);
            if(user == null) return NoContent();
            var tasks = await _context.TaskItem.Where(t => t.userId == user.Id).ToListAsync();
            return tasks.Select(t => new TaskItemReadDTO(){
                taskId = t.taskId,
                title = t.title,
                description = t.description,
                createdAt = t.createdAt,
                updatedAt = t.updatedAt
            }).ToList();
            // return await _context.TaskItem.ToListAsync();
        }

        // GET: api/TaskItem/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TaskItemReadDTO>> GetTaskItem(int id)
        {
            var user = await _userManager.GetUserAsync(User);
            if(user == null) return NoContent();
            var taskItem = await _context.TaskItem.Where(t => t.userId == user.Id).FirstOrDefaultAsync(t => t.taskId == id);
            if (taskItem == null) return NotFound();
            return new TaskItemReadDTO(){
                taskId = taskItem.taskId,
                title = taskItem.title,
                description = taskItem.description,
                createdAt = taskItem.createdAt,
                updatedAt = taskItem.updatedAt
            };
        }

        // PUT: api/TaskItem/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTaskItem(int id, TaskItemUpdateDTO taskItemUpdate)
        {   
            var user = await _userManager.GetUserAsync(User);
            if(user == null) return NoContent();
            var taskItem = await _context.TaskItem.Where(t => t.userId == user.Id).FirstOrDefaultAsync(t => t.taskId == id);
            if(taskItem == null) return NotFound();
            taskItem.title = taskItemUpdate.title;
            taskItem.description = taskItemUpdate.description;
            taskItem.updatedAt = DateTime.Now;
            _context.Entry(taskItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TaskItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/TaskItem
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TaskItemReadDTO>> PostTaskItem(TaskItemCreateDTO taskItemCreate)
        {
            if(!ModelState.IsValid) return BadRequest(ModelState);
            var user = await _userManager.GetUserAsync(User);
            if(user == null ) return NoContent();
            TaskItem taskItem = new TaskItem(){
                title = taskItemCreate.title,
                description = taskItemCreate.description,
                userId = user.Id
            };
            _context.TaskItem.Add(taskItem);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetTaskItem", new { id = taskItem.taskId }, new TaskItemReadDTO(){
                taskId = taskItem.taskId,
                title = taskItem.title,
                description = taskItem.description,
                createdAt = taskItem.createdAt,
                updatedAt = taskItem.updatedAt
            });
        }

        // DELETE: api/TaskItem/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTaskItem(int id)
        {
            var user = await _userManager.GetUserAsync(User);
            if(user == null) return NoContent();
            var taskItem = await _context.TaskItem.Where(t => t.userId == user.Id).FirstOrDefaultAsync(t => t.taskId == id);
            if (taskItem == null)
            {
                return NotFound();
            }

            _context.TaskItem.Remove(taskItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TaskItemExists(int id)
        {
            return _context.TaskItem.Any(e => e.taskId == id);
        }
    }
}
