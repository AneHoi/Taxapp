using System.Text.Json.Serialization;
using api;
using api.middleware;
using service;
using infrastructure;
using infrastructure.Reposotories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
if (builder.Environment.IsDevelopment())
{
    builder.Services.AddNpgsqlDataSource(Utilities.ProperlyFormattedConnectionString,
        dataSourceBuilder => dataSourceBuilder.EnableParameterLogging());
}

if (builder.Environment.IsProduction())
{
    builder.Services.AddNpgsqlDataSource(Utilities.ProperlyFormattedConnectionString);
}
builder.Services.AddScoped<TaxaService>();
builder.Services.AddScoped<TaxaRepository>();
builder.Services.AddSingleton<HttpClient>();
builder.Services.AddSingleton<MailService>();
builder.Services.AddJwtService();
builder.Services.AddHttpClient();
builder.Services.AddControllers();

//The project can access this from everywhere.
builder.Services.AddScoped<AccountService>();
builder.Services.AddScoped<UserRepository>();
builder.Services.AddScoped<PasswordHashRepository>();

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//For allowing secure headers
//app.UseSecurityHeaders();

//For allowing cross site scripting and allowing the API to talk with frontend

app.UseCors(options =>
{
    options.SetIsOriginAllowed(origin => true)
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials();
});
//This makes the headers secure, but it cannot talk with the frontend, if enabled
//app.UseSecurityHeaders();
app.UseMiddleware<JwtBearerHandler>();
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();