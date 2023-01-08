using Zapisywarka.API.Common.Infrastructure;
using Zapisywarka.API.Modules.Identity;
using Zapisywarka.Api.Reservations.Reservations;

var builder = WebApplication.CreateBuilder(args);


// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddIdentityModule();
builder.Services.AddReservationsModule();
builder.Services.AddCommonInfrastructure();
builder.Services.AddCors(options => {
  options.AddDefaultPolicy(policy => {
    policy.WithOrigins("http://zapisywarka.local");
    policy.AllowAnyHeader();
    
  });
});

//docker

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

app.UseCors();

app.UseAuthentication();
app.UseAuthorization();

app.MapGet("/", () => "Zapisywarka.pl api v0.0.1");
app.MapGet("/test", () => "Zapisywarka.pl api test");

app.UseIdenityModule();

app.MapControllers();

app.Run();

Console.WriteLine("TODO: remove");

public partial class Program { }
