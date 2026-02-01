using SanoaAPI.Benutzers.Models;

namespace SanoaAPI.Extensions.ZitateExtensions;

public static class ZitateExtensions
{
    public static void ZitateEndpoints(this WebApplication app)
    {
        app.MapPost("/erstelleZitat", async (Zitate zitat, ContextDb db) => {
                db.Zitate.Add(zitat);
                await db.SaveChangesAsync();

                return Results.Created($"/zitat/{zitat.Id}", zitat);
            })
            .DisableAntiforgery();
        
        app.MapGet("/holeZitate", (ContextDb db) => db.Zitate.ToList());
    }
}