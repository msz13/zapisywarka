using Zapisywarka.API.Modules.Identity;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddIdentityModule();



var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapGet("/", ()=> "Zapisywarka.pl api v5");
app.MapGet("/test", ()=> "Zapisywarka.pl api test");

app.UseIdenityModule();

//sds
app.UseHttpsRedirection();


app.UseAuthorization();

app.MapControllers();

app.Run();
