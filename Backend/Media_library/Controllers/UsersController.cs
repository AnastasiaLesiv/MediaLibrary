
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Media_library.Dtos;
using Media_library.Dtos.ResponseDtos;
using Media_library.Dtos.UpdateDtos;
using Media_library.Entities;
using Media_library.Services;
using Microsoft.AspNetCore.Authorization;

namespace Media_library.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }
        
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return Ok(await _userService.GetUsers());
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<UserDto>> GetUser(Guid id)
        {
            var user = await _userService.GetUserById(id);

            return Ok(user);
        }
        
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> PutUser(Guid id, UpdateUserDto? updateUserDto)
        {
            try
            {
                await _userService.PutUser(id, updateUserDto);
            }
            catch (DbUpdateConcurrencyException)
            {
                    return NotFound();
            }

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<User>> CeateUser(CreateUserDto createUserDto)
        {
            var user  = await _userService.PostUser(createUserDto);
            
            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteUser(Guid id)
        {
            await _userService.DeleteUser(id);
            
            return NoContent();
        }

    }
}
