namespace Media_library.Configuration;

public class JwtOptions
{
    public const string SectionName = "JwtOptions";
    
    public string Key { get; set; }
    public string Issuer { get; set; }
    public string Audience { get; set; }
    public int ValidityInDays { get; set; }
}