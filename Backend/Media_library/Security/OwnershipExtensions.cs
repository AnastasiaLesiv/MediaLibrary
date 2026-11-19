using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Media_library.Security;

public static class OwnershipExtensions
{
    public static async Task<bool> OwnsAsync<T>(
        this ControllerBase controller,
        IQueryable<T> records,
        int id) where T : class
    {
        if (!Guid.TryParse(
                controller.User.FindFirstValue(ClaimTypes.NameIdentifier),
                out var userId))
        {
            return false;
        }

        return await records.AnyAsync(record =>
            EF.Property<int>(record, "Id") == id &&
            EF.Property<Guid>(record, "UserId") == userId);
    }
}