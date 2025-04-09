using ApiPedidos.DTO.Pedido;
using ApiPedidos.Models;
using ApiPedidos.Services.Pedido;
using Microsoft.AspNetCore.Mvc;

namespace ApiPedidos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PedidoController : ControllerBase
    {
        private readonly IPedidoInterface _pedidoInterface;
        public PedidoController(IPedidoInterface pedidoInterface)
        {
            _pedidoInterface = pedidoInterface;
        }

        [HttpGet("ListarPedidos")]
        public async Task<ActionResult<Response<List<Pedido>>>> ListarPedidos()
        {
            var pedido = await _pedidoInterface.ListarPedido();
            return Ok(pedido);
        }

        [HttpPost("CriarPedido")]
        public async Task<ActionResult<Response<List<Pedido>>>> CriarPedido(PedidoCriacaoDto pedidoCriacaoDto)
        {
            var pedido = await _pedidoInterface.CriarPedido(pedidoCriacaoDto);
            return Ok(pedido);

        }

        [HttpPatch("AlterarStatusPedido")]
        public async Task<ActionResult<Response<List<Pedido>>>> AlterarStatusPedido(PedidoAlterarStatusDto alterarStatusDto)
        {
            var pedido = await _pedidoInterface.AlterarStatusPedido(alterarStatusDto);
            return Ok(pedido);

        }

        [HttpDelete("ExcluirPedido")]
        public async Task<ActionResult<Response<List<Pedido>>>> ExcluirPedido(int id)
        {
            var pedido = await _pedidoInterface.ExcluirPedido(id);
            return Ok(pedido);

        }
    }
}
