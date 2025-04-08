using ApiPedidos.Enums;

namespace ApiPedidos.DTO.Pedido
{
    public class AlterarStatusDto
    {
        public int Id { get; set; }
        public StatusPedido Status { get; set; }
    }
}
