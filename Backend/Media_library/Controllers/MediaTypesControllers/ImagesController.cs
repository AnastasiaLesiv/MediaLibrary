using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Media_library;
using Media_library.Dtos;
using Media_library.Dtos.UpdateDtos.MediaTypesDtos;
using Media_library.Entities.MediaTypes;
using Media_library.Services.MediaTypesServices.Contracts;

namespace Media_library.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        private readonly IImageService _imageService;

        public ImagesController(IImageService imageService)
        {
            _imageService = imageService; 
        }


        // GET: api/Images/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Image>> GetImage(int id)
        {
            var image = await _imageService.GetImageById(id);

            return Ok(image);
        }

        // PUT: api/Images/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutImage(int id, UpdateImageDto? updateImageDto)
        {
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
            var image = await  _imageService.PostImage(createImageDto);
            
            return CreatedAtAction("GetImage", new { id = image.Id }, image);
        }

        // DELETE: api/Images/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteImage(int id)
        {
            await _imageService.DeleteImage(id);

            return NoContent();
        }
    }
}
