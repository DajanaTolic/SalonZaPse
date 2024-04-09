using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Tretman : Entitet

    {
        public DateTime Datum { get; set; }

        [ForeignKey("Korisnik")]
        public int Korisnik { get; set; }
    }
}
