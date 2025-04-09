using ApiPedidos.Data;
using ApiPedidos.Models;
using Microsoft.EntityFrameworkCore;

namespace ApiPedidos.Services.Cliente
{
    public class ClienteServices : IClienteInterface
    {
        private readonly AppDbContext _context;
        public ClienteServices(AppDbContext context)
        {
            _context = context;
        }
        public async Task<Response<Models.Cliente>> ListarClientePorId(int id)
        {
            Response<Models.Cliente> response = new Response<Models.Cliente>();

            try
            {
                var cliente = await _context.Clientes.FirstOrDefaultAsync(a => a.Id == id);

                if(cliente == null)
                {
                    response.Mensagem = "Nenhum registro encontrado!";
                }

                response.Dados = cliente;
                response.Mensagem = "Cliente localizados.";

                return response;
            }
            catch (Exception ex)
            {
                response.Mensagem = ex.Message;
                response.Status = false;

                return response;
            }
        }

        public async Task<Response<List<Models.Cliente>>> ListarClientes()
        {
            Response<List<Models.Cliente>> response = new Response<List<Models.Cliente>>();

            try
            {
                var clientes = await _context.Clientes.ToListAsync();
                response.Dados = clientes;
                response.Mensagem = "Clientes localizados.";

                return response;

            }
            catch (Exception ex)
            {
                response.Mensagem = ex.Message;
                response.Status = false;

                return response;
            }
        }
    }
}
