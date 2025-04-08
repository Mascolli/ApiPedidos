using ApiPedidos.Models;

namespace ApiPedidos.Services.Cliente
{
    public interface IClienteInterface
    {
        Task<Response<Models.Cliente>> ListarClientePorId(int id);
    }
}
