using ApiPedidos.Enums;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ApiPedidos.Models
{
    public class Pedido
    {
        [Key]
        public int Id { get; set; }
        public int ClienteId { get; set; }
        [Range(0, double.MaxValue, ErrorMessage = "O total do pedido não pode ser negativo.")]
        public decimal TotalPedido { get; set; }
        public StatusPedido Status { get; set; }
        public DateTime DataCriacao { get; set; }

        [JsonIgnore]
        public ICollection<ItensPedido> Itens { get; set; }

        public Pedido()
        {
            Itens = new List<ItensPedido>();
            DataCriacao = DateTime.Now;
            Status = StatusPedido.Pendente;
        }
    }
}
