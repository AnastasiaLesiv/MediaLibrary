using System.ComponentModel.DataAnnotations;

namespace Media_library.Validation;

[AttributeUsage(AttributeTargets.Property)]
public sealed class MediaResourceUrlAttribute : ValidationAttribute
{
    public MediaResourceUrlAttribute()
    {
        ErrorMessage = "Please provide the correct link from http:// or https://.";
    }

    public override bool IsValid(object? value)
    {
        if (value is null)
        {
            return true;
        }

        if (value is not string text)
        {
            return false;
        }

        if (string.IsNullOrWhiteSpace(text))
        {
            return true;
        }

        return Uri.TryCreate(text.Trim(), UriKind.Absolute, out var uri) && (uri.Scheme == Uri.UriSchemeHttp || uri.Scheme == Uri.UriSchemeHttps);
    }
}