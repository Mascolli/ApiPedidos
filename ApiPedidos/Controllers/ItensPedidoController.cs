using ApiPedidos.DTO.ItensPedido;
using ApiPedidos.Models;
using ApiPedidos.Services.ItensPedido;
using Microsoft.AspNetCore.Mvc;

namespace ApiPedidos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItensPedidoController : ControllerBase
    {
        private readonly IItensPedidoInterface _itensPedidoInterface;

        public ItensPedidoController(IItensPedidoInterface itensPedidoInterface)
        {
            _itensPedidoInterface = itensPedidoInterface;
        }

        [HttpGet("ListarItensPedidos")]
        public async Task<ActionResult<Response<List<ItensPedido>>>> ListarItensPedidos()
        {
            var itensPedido = await _itensPedidoInterface.ListarItensPedido();
            return Ok(itensPedido);
        }

        [HttpPost("CriarItensPedido")]
        public async Task<ActionResult<Response<List<ItensPedido>>>> CriarItensPedido(ItensPedidoCriacaoDto itensPedidoCriacaoDto)
        {
            var itensPedido = await _itensPedidoInterface.CriarItensPedido(itensPedidoCriacaoDto);
            return Ok(itensPedido);

        }
        [HttpDelete("ExcluirItensPedido")]
        public async Task<ActionResult<Response<List<ItensPedido>>>> ExcluirPedido(int id)
        {
            var itensPedido = await _itensPedidoInterface.ExcluirItensPedido(id);
            return Ok(itensPedido);

        }

    }
}
