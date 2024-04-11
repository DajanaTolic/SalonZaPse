using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Stavka:Entitet
    {
        [ForeignKey("Tretman")]

        public Tretman Tretman { get; set; }

        [ForeignKey("Usluga")]
        public  Usluga Usluga  { get; set; }

        public int Kolicina { get; set; }

    }
}
