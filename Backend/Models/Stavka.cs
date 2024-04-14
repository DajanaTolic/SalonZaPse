using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Stavka:Entitet
    {
        [ForeignKey("tretmanid")]

        public Tretman Tretman { get; set; }

        [ForeignKey("uslugaid")]
        public  Usluga Usluga  { get; set; }

        public int Kolicina { get; set; }

    }
}
