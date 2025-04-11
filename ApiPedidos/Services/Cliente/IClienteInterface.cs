using ApiPedidos.DTO.Cliente;
using ApiPedidos.Models;

namespace ApiPedidos.Services.Cliente
{
    public interface IClienteInterface
    {
        Task<Response<Models.Cliente>> ListarClientePorId(int id);
        Task<Response<List<Models.Cliente>>> ListarClientes();
        Task<Response<List<Models.Cliente>>> CadastrarCliente(CadastrarClienteDto cadastrarClienteDto);
    }
}
