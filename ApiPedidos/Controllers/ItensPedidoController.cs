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
        private readonly IItensPedidoInterface _tensPedidoInterface;

        public ItensPedidoController(IItensPedidoInterface itensPedidoInterface)
        {
            _tensPedidoInterface = itensPedidoInterface;
        }

        [HttpGet("ListarItensPedidos")]
        public async Task<ActionResult<Response<List<ItensPedido>>>> ListarItensPedidos()
        {
            var itensPedido = await _tensPedidoInterface.ListarItensPedido();
            return Ok(itensPedido);
        }

        [HttpPost("CriarItensPedido")]
        public async Task<ActionResult<Response<List<ItensPedido>>>> CriarItensPedido(ItensPedidoCriacaoDto itensPedidoCriacaoDto)
        {
            var itensPedido = await _tensPedidoInterface.CriarItensPedido(itensPedidoCriacaoDto);
            return Ok(itensPedido);

        }
        [HttpDelete("ExcluirItensPedido")]
        public async Task<ActionResult<Response<List<ItensPedido>>>> ExcluirPedido(int id)
        {
            var itensPedido = await _tensPedidoInterface.ExcluirItensPedido(id);
            return Ok(itensPedido);

        }

    }
}
