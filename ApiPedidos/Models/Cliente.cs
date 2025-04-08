using System.ComponentModel.DataAnnotations;

namespace ApiPedidos.Models
{
    public class Cliente
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(100)]
        public string Nome { get; set; } = string.Empty;
    }
}
