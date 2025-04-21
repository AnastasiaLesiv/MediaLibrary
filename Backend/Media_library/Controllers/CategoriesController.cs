using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Media_library;
using Media_library.Dtos;
using Media_library.Dtos.UpdateDtos;
using Media_library.Dtos.ResponseDtos;

using Media_library.Entities;
using AutoMapper;
using Media_library.Dtos.ResponseDtos;
using Microsoft.AspNetCore.Http.HttpResults;

namespace Media_library.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly Context _context;
        private readonly IMapper _mapper;

        public CategoriesController(Context context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryDto>>> GetCategories()
        {
            return  Ok(_mapper.Map<IEnumerable<CategoryDto>>( await _context.Categories.ToListAsync()));
        }
        
        [HttpPost]
        public async Task<ActionResult<int>> PostCategory(CreateCategoryDto createCategoryDto)
        {
            var entityCategory = new Category()
            {
                CategoryName = createCategoryDto.CategoryName,
            };
            
            _context.Categories.Add(entityCategory);
            await _context.SaveChangesAsync();

            return Ok(entityCategory.Id);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null)
            {
                return NotFound();
            }

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
