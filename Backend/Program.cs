using Backend.Data;
using Microsoft.EntityFrameworkCore;

try
{



var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//dodavanje baze podataka
builder.Services.AddDbContext<SalonZaPseContext>(o =>
{
    o.UseSqlServer(builder.Configuration.GetConnectionString("SalonZaPseContext"));
});




var app = builder.Build();

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
    app.UseSwagger();
    app.UseSwaggerUI();
//}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseStaticFiles();
app.UseDefaultFiles();
app.MapFallbackToFile("index.html");
//zavr�io za potrebe produkcije

app.Run();



}
catch (Exception e)
{
    
}