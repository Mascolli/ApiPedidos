using ApiPedidos.Data;
using ApiPedidos.DTO.Pedido;
using ApiPedidos.Models;
using Microsoft.EntityFrameworkCore;

namespace ApiPedidos.Services.Pedido
{
    public class PedidoServices : IPedidoInterface
    {
        private readonly AppDbContext _context;
        public PedidoServices(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Response<List<Models.Pedido>>> AlterarStatusPedido(AlterarStatusDto alterarStatusDto)
        {
            Response<List<Models.Pedido>> response = new Response<List<Models.Pedido>>();

            try
            {
                var pedido = await _context.Pedidos.FirstOrDefaultAsync(a => a.Id == alterarStatusDto.Id);

                if (pedido == null)
                {
                    response.Mensagem = "Nenhum pedido encontrado.";
                    return response;
                }

                pedido.Status = alterarStatusDto.Status;

                _context.Update(pedido);
                await _context.SaveChangesAsync();

                response.Dados = await _context.Pedidos.ToListAsync();
                response.Mensagem = "Status do pedido atualizado com sucesso!";

                return response;
            }
            catch (Exception ex)
            {
                response.Mensagem = ex.Message;
                response.Status = false;

                return response;
            }
        }

        public async Task<Response<List<Models.Pedido>>> CriarPedido(PedidoCriacaoDto pedidoCriacaoDto)
        {
            Response<List<Models.Pedido>> response = new Response<List<Models.Pedido>>();

            try
            {
                var pedido = new Models.Pedido()
                {
                    ClienteId = pedidoCriacaoDto.ClienteId,
                    TotalPedido = pedidoCriacaoDto.TotalPedido
                };

                _context.Add(pedido);
                await _context.SaveChangesAsync();

                response.Dados = await _context.Pedidos.ToListAsync();
                response.Mensagem = "Pedido efetuado com sucesso!";

                return response;
            }
            catch (Exception ex)
            {
                response.Mensagem = ex.Message;
                response.Status = false;

                return response;
            }
        }

        public async Task<Response<List<Models.Pedido>>> ExcluirPedido(int id)
        {
            Response<List<Models.Pedido>> response = new Response<List<Models.Pedido>>();

            try
            {
                var pedido = await _context.Pedidos.FirstOrDefaultAsync(a => a.Id == id);

                if (pedido == null)
                {
                    response.Mensagem = "Nenhum pedido encontrado.";
                    return response;
                }

                _context.Remove(pedido);
                await _context.SaveChangesAsync();

                response.Dados = await _context.Pedidos.ToListAsync();
                response.Mensagem = "Pedido excluído com sucesso!";

                return response;

            }
            catch (Exception ex)
            {
                response.Mensagem = ex.Message;
                response.Status = false;

                return response;
            }
        }

        public async Task<Response<List<Models.Pedido>>> ListarPedido()
        {
            Response<List<Models.Pedido>> response = new Response<List<Models.Pedido>>();

            try
            {
                var pedidos = await _context.Pedidos.ToListAsync();
                response.Dados = pedidos;
                response.Mensagem = "Pedidos localizados.";

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
