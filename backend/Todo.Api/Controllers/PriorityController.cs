using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Todo.Core.Entities;
using Todo.Infrastructure.Data;

namespace Todo.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PriorityController : ControllerBase
    {
        private readonly TodoContext _context;

        public PriorityController(TodoContext context)
        {
            _context = context;
        }

        // GET: api/Priority
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Priority>>> GetPriority()
        {
            return await _context.Priority.ToListAsync();
        }

        // GET: api/Priority/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Priority>> GetPriority(int id)
        {
            var priority = await _context.Priority.FindAsync(id);

            if (priority == null)
            {
                return NotFound();
            }

            return priority;
        }

        // PUT: api/Priority/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPriority(int id, Priority priority)
        {
            if (id != priority.priorityId)
            {
                return BadRequest();
            }

            _context.Entry(priority).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PriorityExists(id))
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

        // POST: api/Priority
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Priority>> PostPriority(Priority priority)
        {
            _context.Priority.Add(priority);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPriority", new { id = priority.priorityId }, priority);
        }

        // DELETE: api/Priority/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePriority(int id)
        {
            var priority = await _context.Priority.FindAsync(id);
            if (priority == null)
            {
                return NotFound();
            }

            _context.Priority.Remove(priority);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PriorityExists(int id)
        {
            return _context.Priority.Any(e => e.priorityId == id);
        }
    }
}
