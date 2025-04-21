namespace Media_library.Dtos;

public class CreateUserDto
{
    public string UserName { get; set; }
    public string FullName { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public DateTime RegistrationDate { get; set; }
}