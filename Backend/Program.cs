using Backend.Data;
using Microsoft.EntityFrameworkCore;




var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
    builder.Services.AddCors(opcije =>
    {
        opcije.AddPolicy("CorsPolicy",
            builder =>
                builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()
        );

    });

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
    app.UseCors("CorsPolicy");


    app.UseStaticFiles();
app.UseDefaultFiles();
app.MapFallbackToFile("index.html");
//završio za potrebe produkcije

app.Run();



