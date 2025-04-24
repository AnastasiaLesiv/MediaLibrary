
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Media_library.Dtos;
using Media_library.Dtos.ResponseDtos;
using Media_library.Dtos.UpdateDtos;
using Media_library.Entities;
using Media_library.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.JsonWebTokens;

namespace Media_library.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }
        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return Ok(await _userService.GetUsers());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserDto>> GetUser(Guid id)
        {
            var user = await _userService.GetUserById(id);

            return Ok(user);
        }
        
        [HttpPut("{id}")]
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

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(Guid id)
        {
            await _userService.DeleteUser(id);
            
            return NoContent();
        }

        [HttpGet("folders")]
        public async Task<ActionResult<IEnumerable<FolderDto>>> GetUserFolders()
        {
            var userId = HttpContext.User?.Claims?.FirstOrDefault(c => c.Type ==  ClaimTypes.NameIdentifier);
            var folders = await _userService.GetUserFolders(Guid.Parse(userId.Value));
            
            return Ok(folders);
        }
        
        [HttpGet("me")]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetUserData()
        {
            var userId = HttpContext.User?.Claims?.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
            var userData = await _userService.GetUserOwnData(Guid.Parse(userId.Value));
            
            return Ok(userData);
        }

    }
}
