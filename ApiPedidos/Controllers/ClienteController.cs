﻿using ApiPedidos.DTO.Cliente;
using ApiPedidos.Models;
using ApiPedidos.Services.Cliente;
using Microsoft.AspNetCore.Mvc;

namespace ApiPedidos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClienteController : ControllerBase
    {
        private readonly IClienteInterface _clienteInterface;
        public ClienteController(IClienteInterface clienteInterface)
        {
            _clienteInterface = clienteInterface;
        }

        [HttpGet("ListarClientes/{id}")]
        public async Task<ActionResult<Response<Cliente>>> ListarClientePorId(int id)
        {
            var cliente = await _clienteInterface.ListarClientePorId(id);
            return Ok(cliente);
        }

        [HttpGet("ListarClientes")]
        public async Task<ActionResult<Response<List<Cliente>>>> ListarClientes()
        {
            var pedido = await _clienteInterface.ListarClientes();
            return Ok(pedido);
        }

        [HttpPost("CadastrarCliente")]
        public async Task<ActionResult<Response<List<Cliente>>>> CadastrarCliente(CadastrarClienteDto cadastrarClienteDto)
        {
            var cliente = await _clienteInterface.CadastrarCliente(cadastrarClienteDto);
            return Ok(cliente);

        }
    }
}
