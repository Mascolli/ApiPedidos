using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ApiPedidos.Models
{
    public class ItensPedido
    {
        [Key]
        public int Id { get; set; }
        [Required(ErrorMessage = "O nome do produto é obrigatório.")]
        [StringLength(100, ErrorMessage = "Nome do produto deve ser menor que 100 caracteres.")]
        public string NomeProduto { get; set; } = string.Empty;
        public int PedidoId { get; set; }
        [Range(1, int.MaxValue, ErrorMessage = "A quantidade deve ser maior que zero.")]
        public int Quantidade { get; set; }
        [Range(0.01, double.MaxValue, ErrorMessage = "O preço unitário deve ser maior que zero.")]
        public decimal PrecoUnitario { get; set; }
        [JsonIgnore]
        public Pedido? Pedido { get; set; }
    }
}
