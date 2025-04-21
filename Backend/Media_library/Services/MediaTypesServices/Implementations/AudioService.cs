using AutoMapper;
using Media_library.Dtos;
using Media_library.Dtos.ResponseDtos;
using Media_library.Dtos.UpdateDtos.MediaTypesDtos;
using Media_library.Entities.MediaTypes;
using Media_library.Repositories;
using Media_library.Repositories.MediaTypesRepositories;
using Media_library.Services.MediaTypesServices.Contracts;

namespace Media_library.Services.MediaTypesServices.Implementations;

public class AudioService : IAudioService
{
    private readonly IAudioRepository _audioRepository;
    private readonly IMapper _mapper;

    public AudioService(IAudioRepository audioRepository, IMapper mapper)
    {
        _audioRepository = audioRepository;
        _mapper = mapper;
    }
    
    public async Task<AudioDto> GetAudioById(int id)
    {
        var returnAudio = _mapper.Map<AudioDto>(await _audioRepository.GetAudioById(id));
        
        return await Task.FromResult(returnAudio);
    }

    public async Task PutAudio(int id, UpdateAudioDto? updateAudioDto)
    {
        if (updateAudioDto == null)
        {
            throw new ArgumentNullException(nameof(updateAudioDto));
        }
        
        var audio = await _audioRepository.GetAudioById(id);

        if (audio == null)
        {
            throw new NullReferenceException($"Audio with id: {id} was not found");
        }
        
        audio.Title = updateAudioDto.Title;
        audio.Artist = updateAudioDto.Artist;
        audio.Format = updateAudioDto.Format;
        audio.Duration = updateAudioDto.Duration;
        audio.CategoryId = updateAudioDto.CategoryId;
        
        await _audioRepository.PutAudio(audio);
    }

    public async Task<Audio> PostAudio(CreateAudioDto createAudioDto)
    {
        if (createAudioDto == null)
        {
            throw new ArgumentNullException(nameof(createAudioDto));
        }

        var entityAudio = new Audio()
        {
            Title = createAudioDto.Title,
            Artist = createAudioDto.Artist,
            Format = createAudioDto.Format,
            Duration = createAudioDto.Duration,
            UploadDate = createAudioDto.UploadDate,
            CategoryId = createAudioDto.CategoryId,
            UserId = createAudioDto.UserId
        };
        
        await _audioRepository.PostAudio(entityAudio);
        
        return entityAudio;
    }

    public async Task DeleteAudio(int id)
    {
        var audio = await _audioRepository.GetAudioById(id);

        if (audio == null)
        {
            throw new NullReferenceException($"Audio with id: {id} was not found");
        }
        
        await _audioRepository.DeleteAudio(audio);
    }
}