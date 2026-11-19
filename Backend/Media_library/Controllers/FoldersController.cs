using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Media_library;
using Media_library.Dtos;
using Media_library.Dtos.FolderItemsDtos;
using Media_library.Dtos.UpdateDtos;
using Media_library.Entities;
using Media_library.Entities.FolderItems;
using Media_library.Services;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Media_library.Security;

namespace Media_library.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class FoldersController : ControllerBase
    {
        private readonly IFolderService _folderService;
        private readonly Context _context;

        public FoldersController(IFolderService folderService, Context context)
        {
            _folderService = folderService;
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Folder>> GetFolder(int id)
        {
            if (!await this.OwnsAsync(_context.Folders, id))
            {
                return NotFound();
            }

            
            var folder = await _folderService.GetFolderById(id);
            return Ok(folder);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutFolder(int id, UpdateFolderDto? updateFolderDto)
        {
            if (!await this.OwnsAsync(_context.Folders, id))
            {
                return NotFound();
            }
            
            try
            {
                await _folderService.PutFolder(id, updateFolderDto);
            }
            catch (DbUpdateConcurrencyException)
            {
                    return NotFound();
            }

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<Folder>> PostFolder(CreateFolderDto createFolderDto)
        {
            if (!Guid.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out var currentUserId))
            {
                return Unauthorized();
            }
            
            createFolderDto.UserId = currentUserId;
            var folder = await _folderService.PostFolder(createFolderDto);
            return CreatedAtAction("GetFolder", new { id = folder.Id }, folder);
        }
 
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFolder(int id)
        {
            if (!await this.OwnsAsync(_context.Folders, id))
            {
                return NotFound();
            }

            await _folderService.DeleteFolder(id);
            return NoContent();
        }

        #region Add media files
        [HttpPost("/AddAudioToFolder")]
        public async Task<ActionResult<FolderItemAudio>> PostFolderItemAudio(CreateFolderItemAudioDto createFolderItemAudioDto)
        {
            if (!await this.OwnsAsync(_context.Folders, createFolderItemAudioDto.FolderId) || !await this.OwnsAsync(_context.Audios, createFolderItemAudioDto.AudioId))
            {
                return NotFound();
            }
            
            var folderItemAudio = await _folderService.PostFolderItemAudio(createFolderItemAudioDto);
            return Created("", folderItemAudio.FolderId);
        }
        
        [HttpPost("/AddEbookToFolder")]
        public async Task<ActionResult<FolderItemEbook>> PostFolderItemEbook(CreateFolderItemEbookDto createFolderItemEbookDto)
        {
            if (!await this.OwnsAsync(_context.Folders, createFolderItemEbookDto.FolderId) || !await this.OwnsAsync(_context.Ebooks, createFolderItemEbookDto.EbookId))
            {
                return NotFound();
            }
            
            var folderItemEbook = await _folderService.PostFolderItemEbook(createFolderItemEbookDto);
            return Created("", folderItemEbook.FolderId);
        }
        
        [HttpPost("/AddImageToFolder")]
        public async Task<ActionResult<FolderItemImage>> PostFolderItemImage(CreateFolderItemImageDto createFolderItemImageDto)
        {
            if (!await this.OwnsAsync(_context.Folders, createFolderItemImageDto.FolderId) || !await this.OwnsAsync(_context.Images, createFolderItemImageDto.ImageId))
            {
                return NotFound();
            }

            var folderItemImage = await _folderService.PostFolderItemImage(createFolderItemImageDto);
            return Created("", folderItemImage.FolderId);
        }

        [HttpPost("/AddVideoToFolder")]
        public async Task<ActionResult<FolderItemVideo>> PostFolderItemVideo(CreateFolderItemVideoDto createFolderItemVideoDto)
        {
            if (!await this.OwnsAsync(_context.Folders, createFolderItemVideoDto.FolderId) || !await this.OwnsAsync(_context.Videos, createFolderItemVideoDto.VideoId))
            {
                return NotFound();
            }
            
            var folderItemVideo = await _folderService.PostFolderItemVideo(createFolderItemVideoDto);
            return Created("", folderItemVideo.FolderId);
        }

        #endregion
                
        #region Delete media files
        
        [HttpDelete("/DeleteAudioFromFolder/{folderId}/{audioId}")]
        public async Task<IActionResult> DeleteFolderItemAudio(int folderId , int audioId)
        {
            if (!await this.OwnsAsync(_context.Folders, folderId) || !await this.OwnsAsync(_context.Audios, audioId))
            {
                return NotFound();
            }
            
            await _folderService.DeleteFolderItemAudio(folderId, audioId);
            return NoContent();
        }
        
        [HttpDelete("/DeleteEbookFromFolder/{folderId}/{ebookId}")]
        public async Task<IActionResult> DeleteFolderItemEbook(int folderId , int ebookId)
        {
            if (!await this.OwnsAsync(_context.Folders, folderId) || !await this.OwnsAsync(_context.Ebooks, ebookId))
            {
                return NotFound();
            }
            
            await _folderService.DeleteFolderItemEbook(folderId, ebookId);
            return NoContent();
        }
        
        [HttpDelete("/DeleteImageFromFolder/{folderId}/{imageId}")]
        public async Task<IActionResult> DeleteFolderItemImage(int folderId , int imageId)
        {
            if (!await this.OwnsAsync(_context.Folders, folderId) || !await this.OwnsAsync(_context.Images, imageId))
            {
                return NotFound();
            }
            
            await _folderService.DeleteFolderItemImage(folderId, imageId);
            return NoContent();
        }
        
        [HttpDelete("/DeleteVideoFromFolder/{folderId}/{videoId}")]
        public async Task<IActionResult> DeleteFolderItemVideo(int folderId , int videoId)
        {
            if (!await this.OwnsAsync(_context.Folders, folderId) || !await this.OwnsAsync(_context.Videos, videoId))
            {
                return NotFound();
            }
            await _folderService.DeleteFolderItemVideo(folderId, videoId);
            return NoContent();
        }
        
        #endregion
    }
}
