namespace Backend.Models
{
    public class Stavka:Entitet
    {
        public int? Tretman { get; set; }

        [ForeignKey("Usluga")]
        public required Usluga Usluga { get; set; }

        [ForeignKey("Kolicina")]
        public required Kolicina Kolicina { get; set; }

    }
}
