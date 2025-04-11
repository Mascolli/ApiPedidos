using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ApiPedidos.Models
{
    public class Cliente
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(100)]
        public string Nome { get; set; } = string.Empty;
        [JsonIgnore]
        public ICollection<Pedido> Pedidos { get; set; }

        public Cliente()
        {
            Pedidos = new List<Pedido>();
        }

    }
}
