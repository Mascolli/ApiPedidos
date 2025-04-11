export interface PedidoListar{
    id?: number;
    clienteId: number;
    totalPedido: number;
    status: number;
    dataCriacao: Date;
}

export interface PedidoCriar {
    clienteId: number | null;
    itensPedido: {
      itemId: number,
      nome: string,
      pedidoId?: number,
      quantidade: number,
      precoUnitario: number
    }[];
    totalPedido: number;
  }