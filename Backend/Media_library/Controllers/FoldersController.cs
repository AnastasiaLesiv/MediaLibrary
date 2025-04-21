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

namespace Media_library.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class FoldersController : ControllerBase
    {
        private readonly IFolderService _folderService;

        public FoldersController(IFolderService folderService)
        {
            _folderService = folderService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Folder>> GetFolder(int id)
        {
            var folder = await _folderService.GetFolderById(id);

            return Ok(folder);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutFolder(int id, UpdateFolderDto? updateFolderDto)
        {
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
            var folder = await _folderService.PostFolder(createFolderDto);

            return CreatedAtAction("GetFolder", new { id = folder.Id }, folder);
        }
 
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFolder(int id)
        {
            await _folderService.DeleteFolder(id);
            
            return NoContent();
        }

        #region Add media files
        [HttpPost("/AddAudioToFolder")]
        public async Task<ActionResult<FolderItemAudio>> PostFolderItemAudio(CreateFolderItemAudioDto createFolderItemAudioDto)
        {
            var folderItemAudio = await _folderService.PostFolderItemAudio(createFolderItemAudioDto);

            return Created("", folderItemAudio.FolderId);
        }
        
        [HttpPost("/AddEbookToFolder")]
        public async Task<ActionResult<FolderItemEbook>> PostFolderItemEbook(CreateFolderItemEbookDto createFolderItemEbookDto)
        {
            var folderItemEbook = await _folderService.PostFolderItemEbook(createFolderItemEbookDto);

            return Created("", folderItemEbook.FolderId);
        }
        
        [HttpPost("/AddImageToFolder")]
        public async Task<ActionResult<FolderItemImage>> PostFolderItemImage(CreateFolderItemImageDto createFolderItemImageDto)
        {
            var folderItemImage = await _folderService.PostFolderItemImage(createFolderItemImageDto);

            return Created("", folderItemImage.FolderId);
        }

        [HttpPost("/AddVideoToFolder")]
        public async Task<ActionResult<FolderItemVideo>> PostFolderItemVideo(CreateFolderItemVideoDto createFolderItemVideoDto)
        {
            var folderItemVideo = await _folderService.PostFolderItemVideo(createFolderItemVideoDto);

            return Created("", folderItemVideo.FolderId);
        }

        #endregion
                
        #region Delete media files
        
        [HttpDelete("/DeleteAudioFromFolder/{folderId}/{audioId}")]
        public async Task<IActionResult> DeleteFolderItemAudio(int folderId , int audioId)
        {
            await _folderService.DeleteFolderItemAudio(folderId, audioId);

            return NoContent();
        }
        
        [HttpDelete("/DeleteEbookFromFolder/{folderId}/{ebookId}")]
        public async Task<IActionResult> DeleteFolderItemEbook(int folderId , int ebookId)
        {
            await _folderService.DeleteFolderItemEbook(folderId, ebookId);

            return NoContent();
        }
        
        [HttpDelete("/DeleteImageFromFolder/{folderId}/{imageId}")]
        public async Task<IActionResult> DeleteFolderItemImage(int folderId , int imageId)
        {
            await _folderService.DeleteFolderItemImage(folderId, imageId);

            return NoContent();
        }
        
        [HttpDelete("/DeleteVideoFromFolder/{folderId}/{videoId}")]
        public async Task<IActionResult> DeleteFolderItemVideo(int folderId , int videoId)
        {
            await _folderService.DeleteFolderItemVideo(folderId, videoId);

            return NoContent();
        }
        
        #endregion
    }
}
