namespace Media_library.Dtos.ResponseDtos;

public class TokenResponseDto
{
    public string AccessToken { get; set; }
    public DateTime ExpiresAt { get; set; }
}