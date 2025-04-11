using ApiPedidos.Data;
using ApiPedidos.DTO.ItensPedido;
using ApiPedidos.Models;
using Microsoft.EntityFrameworkCore;

namespace ApiPedidos.Services.ItensPedido
{
    public class ItensPedidoServices : IItensPedidoInterface
    {
        public readonly AppDbContext _context;
        public ItensPedidoServices(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Response<List<Models.ItensPedido>>> CriarItensPedido(ItensPedidoCriacaoDto itemPedidoCriacaoDto)
        {
            Response<List<Models.ItensPedido>> response = new Response<List<Models.ItensPedido>>();

            try
            {
                var itemPedido = new Models.ItensPedido()
                {
                    Nome = itemPedidoCriacaoDto.Nome,
                    PedidoId = itemPedidoCriacaoDto.PedidoId,
                    Quantidade = itemPedidoCriacaoDto.Quantidade,
                    PrecoUnitario = itemPedidoCriacaoDto.PrecoUnitario
                };

                _context.Add(itemPedido);
                await _context.SaveChangesAsync();

                response.Dados = await _context.ItemPedidos.ToListAsync();
                response.Mensagem = "item do Pedido adicionado com sucesso!";

                return response;
            }
            catch (Exception ex)
            {
                response.Mensagem = ex.Message;
                response.Status = false;

                return response;
            }
        }

        public async Task<Response<List<Models.ItensPedido>>> ExcluirItensPedido(int id)
        {
            Response<List<Models.ItensPedido>> response = new Response<List<Models.ItensPedido>>();

            try
            {
                var itemPedido = await _context.ItemPedidos.FirstOrDefaultAsync(a => a.Id == id);

                if (itemPedido == null)
                {
                    response.Mensagem = "Nenhum item encontrado.";
                    return response;
                }

                _context.Remove(itemPedido);
                await _context.SaveChangesAsync();

                response.Dados = await _context.ItemPedidos.ToListAsync();
                response.Mensagem = "Item excluído com sucesso!";

                return response;

            }
            catch (Exception ex)
            {
                response.Mensagem = ex.Message;
                response.Status = false;

                return response;
            }
        }

        public async Task<Response<List<Models.ItensPedido>>> ListarItensPedido()
        {
            Response<List<Models.ItensPedido>> response = new Response<List<Models.ItensPedido>>();

            try
            {
                var itemPedidos = await _context.ItemPedidos.ToListAsync();
                response.Dados = itemPedidos;
                response.Mensagem = "Itens do pedido localizados.";

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
