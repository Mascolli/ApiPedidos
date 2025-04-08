using ApiPedidos.Models;
using Microsoft.EntityFrameworkCore;

namespace ApiPedidos.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Pedido> Pedidos { get; set; }
        public DbSet<ItemPedido> ItemPedidos { get; set; }
        public DbSet<Cliente> Clientes { get; set; }
    }
}
