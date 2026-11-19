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
    public class AudiosController : ControllerBase
    {
        private readonly IAudioService _audioService;
        private readonly Context _context;
        
        public AudiosController(IAudioService audioService, Context context)
        {
            _audioService = audioService;
            _context = context;
        }

        // GET: api/Audios/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AudioDto>> GetAudio(int id)
        {
            if (!await this.OwnsAsync(_context.Audios, id))
            {
                return NotFound();
            }
            
            var audio = await _audioService.GetAudioById(id);
            return Ok(audio);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAudio(int id, UpdateAudioDto? updateAudioDto)
        {
            if (!await this.OwnsAsync(_context.Audios, id))
            {
                return NotFound();
            }
            if (updateAudioDto == null)
            {
                return BadRequest("Не передано дані для редагування.");
            }
            if (!await _context.Categories.AnyAsync(c => c.Id == updateAudioDto.CategoryId))
            {
                return BadRequest("Вибраної категорії не існує.");
            }
            
            try
            {
                await _audioService.PutAudio(id, updateAudioDto);
            }
            catch (DbUpdateConcurrencyException)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<Audio>> PostAudio(CreateAudioDto createAudioDto)
        {
            if (!Guid.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out var currentUserId))
            {
                return Unauthorized();
            }
            createAudioDto.UserId = currentUserId;
            
            if (!await _context.Categories.AnyAsync(c => c.Id == createAudioDto.CategoryId))
            {
                return BadRequest("Вибраної категорії не існує.");
            }
            
            var audio = await _audioService.PostAudio(createAudioDto);
            return CreatedAtAction("GetAudio", new { id = audio.Id }, audio);
        }

        // DELETE: api/Audios/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAudio(int id)
        {
            if (!await this.OwnsAsync(_context.Audios, id))
            {
                return NotFound();
            }
            
            await _audioService.DeleteAudio(id);
            return NoContent();
        }
    }
}
