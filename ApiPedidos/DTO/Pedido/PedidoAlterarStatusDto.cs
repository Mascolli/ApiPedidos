using ApiPedidos.Enums;

namespace ApiPedidos.DTO.Pedido
{
    public class PedidoAlterarStatusDto
    {
        public int Id { get; set; }
        public StatusPedido Status { get; set; }
    }
}
