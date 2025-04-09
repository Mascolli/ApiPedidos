using ApiPedidos.DTO.Pedido;
using ApiPedidos.Models;

namespace ApiPedidos.Services.Pedido
{
    public interface IPedidoInterface
    {
        Task<Response<List<Models.Pedido>>> ListarPedido();
        Task<Response<List<Models.Pedido>>> CriarPedido(PedidoCriacaoDto pedidoCriacaoDto);
        Task<Response<List<Models.Pedido>>> ExcluirPedido(int id);
        Task<Response<List<Models.Pedido>>> AlterarStatusPedido(PedidoAlterarStatusDto alterarStatusDto);

    }
}
