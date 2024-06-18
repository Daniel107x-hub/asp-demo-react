using System.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Todo.Infrastructure.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddRouting(option => option.LowercaseUrls = true);
builder.Services.AddControllers();
builder.Services.AddDbContext<TodoContext>();
builder.Services.AddIdentityApiEndpoints<IdentityUser>()
    .AddEntityFrameworkStores<TodoContext>();

// Add CORS for testing
var specificOrigins = "AppOrigins";
if(builder.Environment.IsDevelopment())
{
    builder.Services.AddCors(options => {
        options.AddPolicy(name: specificOrigins,
            policy => {
                policy.WithOrigins("http://localhost:3000", "https://localhost:3000")
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials();
            }
        );
    });
}

var app = builder.Build();
AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors(specificOrigins);
}

// Add logout endpoint
app.MapPost("/logout", async (SignInManager<IdentityUser> signInManager, [FromBody] object empty) =>
    {
        if (empty != null)
        {
            await signInManager.SignOutAsync();
            return Results.Ok();
        }
        return Results.Unauthorized();
    }
)
.WithOpenApi()
.RequireAuthorization();

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapIdentityApi<IdentityUser>();

app.Run();