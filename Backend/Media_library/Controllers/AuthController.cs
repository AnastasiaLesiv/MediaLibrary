using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Media_library.Configuration;
using Media_library.Dtos;
using Media_library.Dtos.ResponseDtos;
using Media_library.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Media_library.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly JwtOptions _jwtOptions;

        public AuthController(UserManager<User> userManager, SignInManager<User> signInManager, IOptions<JwtOptions> jwtOptions)
        {
            _signInManager = signInManager;
            _jwtOptions = jwtOptions.Value;
            _userManager = userManager;
        }
        
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            var user = await _userManager.FindByNameAsync(loginDto.Username);
            if (user is null)
            {
                return NotFound();
            }
            
            var result = await _signInManager.PasswordSignInAsync(user, loginDto.Password, false, false);
            if (!result.Succeeded)
            {
                return Unauthorized();
            }

            var token = GenerateToken(user);
            return Ok(token);
        }

        private TokenResponseDto GenerateToken(User user)
        {
            var expirationDate = DateTime.UtcNow.AddDays(_jwtOptions.ValidityInDays);

            var token = GetJwtSecurityToken(user, expirationDate);
            var resToken = new JwtSecurityTokenHandler().WriteToken(token);
            
            return new TokenResponseDto
            {
                AccessToken = resToken,
                ExpiresAt = expirationDate
            };
        }
        
        private JwtSecurityToken GetJwtSecurityToken(User user, DateTime? expirationTime)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user is null ? "" : user.Id.ToString()),
                new Claim(ClaimTypes.Name, user is null ? "" : user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, user is null ? "" : user.Id.ToString()),
            };

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_jwtOptions.Key));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            return new JwtSecurityToken(
                issuer: _jwtOptions.Issuer,
                audience: _jwtOptions.Audience,
                claims,
                expires: expirationTime,
                signingCredentials: creds
            );
        }
    }
}
