using System.ComponentModel.DataAnnotations;

namespace ApiPedidos.Enums
{
    public enum StatusPedido : int
    {
        [Display(Name = "Pendente")]
        Pendente = 1,

        [Display(Name = "Processado")]
        Processado = 2
    }
}
