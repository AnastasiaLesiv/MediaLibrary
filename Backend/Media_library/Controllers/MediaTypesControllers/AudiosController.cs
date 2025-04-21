using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Media_library.Dtos;
using Media_library.Dtos.ResponseDtos;
using Media_library.Dtos.UpdateDtos.MediaTypesDtos;
using Media_library.Entities.MediaTypes;
using Media_library.Services.MediaTypesServices.Contracts;

namespace Media_library.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AudiosController : ControllerBase
    {
        private readonly IAudioService _audioService;
        
        public AudiosController(IAudioService audioService)
        {
            _audioService = audioService;
        }

        // GET: api/Audios/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AudioDto>> GetAudio(int id)
        {
            var audio = await _audioService.GetAudioById(id);

            return Ok(audio);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAudio(int id, UpdateAudioDto? updateAudioDto)
        {
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
            var audio = await _audioService.PostAudio(createAudioDto);
            
            return CreatedAtAction("GetAudio", new { id = audio.Id }, audio);
        }

        // DELETE: api/Audios/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAudio(int id)
        {
            await _audioService.DeleteAudio(id);

            return NoContent();
        }
    }
}
