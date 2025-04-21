using Media_library.Entities.MediaTypes;

namespace Media_library.Repositories.MediaTypesRepositories;

public interface IAudioRepository
{
    Task<Audio?> GetAudioById(int id);
    Task PutAudio(Audio audio);
    Task PostAudio(Audio audio);
    Task DeleteAudio(Audio audio);
}