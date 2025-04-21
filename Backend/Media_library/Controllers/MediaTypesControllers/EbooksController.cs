using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Media_library;
using Media_library.Dtos;
using Media_library.Dtos.ResponseDtos;
using Media_library.Dtos.UpdateDtos.MediaTypesDtos;
using Media_library.Entities.MediaTypes;
using Media_library.Services.MediaTypesServices.Contracts;

namespace Media_library.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EbooksController : ControllerBase
    {
        private readonly IEbookService _ebookService;

        public EbooksController(IEbookService ebookService)
        {
            _ebookService = ebookService;
        }

        // GET: api/Ebooks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EbookDto>> GetEbook(int id)
        {
            var ebook = await _ebookService.GetEbookById(id);

            return Ok(ebook);
        }

        // PUT: api/Ebooks/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEbook(int id, UpdateEbookDto? updateEbookDto)
        {           
            try
            {
                await _ebookService.PutEbook(id, updateEbookDto);
            }
            catch (DbUpdateConcurrencyException)
            {
               return NotFound();
            }

            return NoContent();
        }

        // POST: api/Ebooks
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Ebook>> PostEbook(CreateEbookDto createEbookDto)
        {
            var ebook = await _ebookService.PostEbook(createEbookDto);
            
            return CreatedAtAction("GetEbook", new { id = ebook.Id }, ebook);
        }

        // DELETE: api/Ebooks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEbook(int id)
        {
            await _ebookService.DeleteEbook(id);
            
            return NoContent();
        }
    }
}
