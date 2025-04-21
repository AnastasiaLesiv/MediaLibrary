using Media_library.Dtos;
using Media_library.Dtos.ResponseDtos;
using Media_library.Dtos.UpdateDtos.MediaTypesDtos;
using Media_library.Entities.MediaTypes;

namespace Media_library.Services.MediaTypesServices.Contracts;

public interface IAudioService
{
    Task<AudioDto> GetAudioById(int id);
    Task PutAudio(int id, UpdateAudioDto? updateAudioDto);
    Task<Audio> PostAudio(CreateAudioDto createAudioDto);
    Task DeleteAudio(int id);
}