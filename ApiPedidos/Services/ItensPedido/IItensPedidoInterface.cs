using ApiPedidos.DTO.ItensPedido;
using ApiPedidos.Models;

namespace ApiPedidos.Services.ItensPedido
{
    public interface IItensPedidoInterface
    {
        Task<Response<List<Models.ItensPedido>>> ListarItensPedido();
        Task<Response<List<Models.ItensPedido>>> CriarItensPedido(ItensPedidoCriacaoDto itensPedidoCriacaoDto);
        Task<Response<List<Models.ItensPedido>>> ExcluirItensPedido(int id);
    }
}
