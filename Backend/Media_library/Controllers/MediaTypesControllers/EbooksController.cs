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
    public class EbooksController : ControllerBase
    {
        private readonly IEbookService _ebookService;
        private readonly Context _context;

        public EbooksController(IEbookService ebookService, Context context)
        {
            _ebookService = ebookService;
            _context = context;
        }

        // GET: api/Ebooks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EbookDto>> GetEbook(int id)
        {
            if (!await this.OwnsAsync(_context.Ebooks, id))
            {
                return NotFound();
            }
            
            var ebook = await _ebookService.GetEbookById(id);
            return Ok(ebook);
        }

        // PUT: api/Ebooks/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEbook(int id, UpdateEbookDto? updateEbookDto)
        {  
            if (!await this.OwnsAsync(_context.Ebooks, id))
            {
                return NotFound();
            }
            if (updateEbookDto == null)
            {
                return BadRequest("Не передано дані для редагування.");
            }
            if (!await _context.Categories.AnyAsync(c => c.Id == updateEbookDto.CategoryId))
            {
                return BadRequest("Вибраної категорії не існує.");
            }
            
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
            if (!Guid.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out var currentUserId))
            {
                return Unauthorized();
            }
            createEbookDto.UserId = currentUserId;
            
            if (!await _context.Categories.AnyAsync(c => c.Id == createEbookDto.CategoryId))
            {
                return BadRequest("Вибраної категорії не існує.");
            }
            
            var ebook = await _ebookService.PostEbook(createEbookDto);
            return CreatedAtAction("GetEbook", new { id = ebook.Id }, ebook);
        }

        // DELETE: api/Ebooks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEbook(int id)
        {
            if (!await this.OwnsAsync(_context.Ebooks, id))
            {
                return NotFound();
            }
            
            await _ebookService.DeleteEbook(id);
            return NoContent();
        }
    }
}
