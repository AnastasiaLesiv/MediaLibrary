using Media_library.Dtos;
using Media_library.Dtos.UpdateDtos.MediaTypesDtos;
using Media_library.Entities.MediaTypes;
using Media_library.Services.MediaTypesServices.Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Media_library.Security;

namespace Media_library.Controllers.MediaTypesControllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ImagesController : ControllerBase
    {
        private readonly IImageService _imageService;
        private readonly Context _context;

        public ImagesController(IImageService imageService, Context context)
        {
            _imageService = imageService; 
            _context = context;
        }


        // GET: api/Images/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Image>> GetImage(int id)
        {
            if (!await this.OwnsAsync(_context.Images, id))
            {
                return NotFound();
            }
            
            var image = await _imageService.GetImageById(id);
            return Ok(image);
        }

        // PUT: api/Images/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutImage(int id, UpdateImageDto? updateImageDto)
        {
            if (!await this.OwnsAsync(_context.Images, id))
            {
                return NotFound();
            }
            if (updateImageDto == null)
            {
                return BadRequest("Не передано дані для редагування.");
            }
            if (!await _context.Categories.AnyAsync(c => c.Id == updateImageDto.CategoryId))
            {
                return BadRequest("Вибраної категорії не існує.");
            }
            
            try
            {
                await _imageService.PutImage(id, updateImageDto);
            }
            catch (DbUpdateConcurrencyException)
            {
                return NotFound();
            }

            return NoContent();
        }

        // POST: api/Images
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Image>> PostImage(CreateImageDto createImageDto)
        {
            if (!Guid.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out var currentUserId))
            {
                return Unauthorized();
            }
            createImageDto.UserId = currentUserId;
            
            if (!await _context.Categories.AnyAsync(c => c.Id == createImageDto.CategoryId))
            {
                return BadRequest("Вибраної категорії не існує.");
            }
            
            var image = await  _imageService.PostImage(createImageDto);
            return CreatedAtAction("GetImage", new { id = image.Id }, image);
        }

        // DELETE: api/Images/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteImage(int id)
        {
            if (!await this.OwnsAsync(_context.Images, id))
            {
                return NotFound();
            }
            
            await _imageService.DeleteImage(id);
            return NoContent();
        }
    }
}
