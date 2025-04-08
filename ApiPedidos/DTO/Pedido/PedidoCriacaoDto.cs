using System.ComponentModel.DataAnnotations;

namespace ApiPedidos.DTO.Pedido
{
    public class PedidoCriacaoDto
    {
        public int ClienteId { get; set; }
        public decimal TotalPedido { get; set; }
    }
}
