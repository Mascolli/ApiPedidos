using ApiPedidos.Data;
using ApiPedidos.Services.Cliente;
using ApiPedidos.Services.ItensPedido;
using ApiPedidos.Services.Pedido;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IPedidoInterface, PedidoServices>();
builder.Services.AddScoped<IClienteInterface, ClienteServices>();
builder.Services.AddScoped<IItensPedidoInterface, ItensPedidoServices>();

builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("pedidosApi", builder =>
    {
        builder.AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("pedidosApi");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
