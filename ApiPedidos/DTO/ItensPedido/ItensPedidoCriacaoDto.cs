namespace ApiPedidos.DTO.ItensPedido
{
    public class ItensPedidoCriacaoDto
    {
        public string NomeProduto { get; set; } = string.Empty;
        public int PedidoId { get; set; }
        public int Quantidade { get; set; }
        public decimal PrecoUnitario { get; set; }
    }
}
