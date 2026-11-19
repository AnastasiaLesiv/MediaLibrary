using Media_library.Dtos;
using Media_library.Dtos.ResponseDtos;
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
    public class VideosController : ControllerBase
    {
        private readonly IVideoService _videoService;
        private readonly Context _context;

        public VideosController(IVideoService videoService, Context context)
        {
            _videoService = videoService;
            _context = context;
        }

        // GET: api/Videos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<VideoDto>> GetVideo(int id)
        {
            if (!await this.OwnsAsync(_context.Videos, id))
            {
                return NotFound();
            }

            var video = await _videoService.GetVideoById(id);
            return Ok(video);
        }

        // PUT: api/Videos/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVideo(int id, UpdateVideoDto updateVideoDto)
        {
            if (!await this.OwnsAsync(_context.Videos, id))
            {
                return NotFound();
            }
            if (updateVideoDto == null)
            {
                return BadRequest("Не передано дані для редагування.");
            }
            if (!await _context.Categories.AnyAsync(c => c.Id == updateVideoDto.CategoryId))
            {
                return BadRequest("Вибраної категорії не існує.");
            }

            try
            {
                await _videoService.PutVideo(id, updateVideoDto);
            }
            catch (DbUpdateConcurrencyException)
            {
                return NotFound();
            }

            return NoContent();
        }

        // POST: api/Videos
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Video>> PostVideo(CreateVideoDto createVideoDto)
        {
            if (!Guid.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out var currentUserId))
            {
                return Unauthorized();
            }

            createVideoDto.UserId = currentUserId;

            if (!await _context.Categories.AnyAsync(c => c.Id == createVideoDto.CategoryId))
            {
                return BadRequest("Вибраної категорії не існує.");
            }

            var video = await _videoService.PostVideo(createVideoDto);
            return CreatedAtAction("GetVideo", new { id = video.Id }, video);
        }

        // DELETE: api/Videos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVideo(int id)
        {
            if (!await this.OwnsAsync(_context.Videos, id))
            {
                return NotFound();
            }

            await _videoService.DeleteVideo(id);
            return NoContent();
        }
    }
}