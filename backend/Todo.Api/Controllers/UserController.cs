using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Todo.Api.Models;
using Todo.Infrastructure.Data;

namespace Todo.Api.Controllers
{
    [Route("api/account/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly TodoContext _context;
        private readonly UserManager<IdentityUser> _userManager;

        public UserController(TodoContext context, UserManager<IdentityUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<ActionResult<UserDTO>> GetUser()
        {
            // Convert the db tasks to dtos
            var user = await _userManager.GetUserAsync(User);
            if(user == null) return NoContent();
            var tasks = await _context.TaskItem.Where(t => t.userId == user.Id).FirstAsync();
            return new UserDTO(){
                userName = user.UserName,
                email = user.Email,
                phoneNumber = user.PhoneNumber
            };
        }

        [HttpPut]
        public async Task<ActionResult<UserDTO>> UpdateUser(UserDTO userUpdate)
        {
            var user = await _userManager.GetUserAsync(User);
            if(user == null) return NoContent();
            user.UserName = userUpdate.userName;
            user.Email = userUpdate.email;
            user.PhoneNumber = userUpdate.phoneNumber;
            await _userManager.UpdateAsync(user);
            return new UserDTO(){
                userName = user.UserName,
                email = user.Email,
                phoneNumber = user.PhoneNumber
            };
        }
    }
}