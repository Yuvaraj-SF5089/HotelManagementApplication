using System.Threading.Tasks;
using HotelManagementAPI.Controllers;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = Microsoft.AspNetCore.Builder.WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("FrontendPolicy", policy =>
    {
        policy.WithOrigins("http://localhost:5175")
              .AllowCredentials()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddDbContext<ApplicationDBContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("PostgresDB")));

// Add Authentication
builder.Services.AddAuthentication("MyCookieAuth")
    .AddCookie("MyCookieAuth", options =>
    {
        options.Cookie.Name = "MyAppAuthCookie";
        options.LoginPath = "/api/hotelmanagement/auth/login";
        options.LogoutPath = "/api/hotelmanagement/auth/logout";
        options.AccessDeniedPath = "/api/hotelmanagement/auth/denied";
        // options.Events.OnRedirectToLogin = context =>
        // {
        //     context.Response.StatusCode = StatusCodes.Status401Unauthorized;
        //     return Task.CompletedTask;
        // };
        // options.Events.OnRedirectToAccessDenied = context =>
        // {
        //     context.Response.StatusCode = StatusCodes.Status403Forbidden;
        //     return Task.CompletedTask;
        // };
        options.Cookie.HttpOnly = true;
        options.Cookie.SameSite = SameSiteMode.Lax;
        options.Cookie.SecurePolicy = CookieSecurePolicy.None; // Use Always in production
    });

builder.Services.AddAuthorization();

var app = builder.Build();

// Configure the middleware pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseDeveloperExceptionPage();
}

app.UseHttpsRedirection();
app.UseRouting();
app.UseCors("FrontendPolicy");

app.UseAuthentication();
app.UseAuthorization();

app.MapGet("/", () => "GroceryStore");

app.MapControllers();

app.Run();
