namespace Backend.Models
{
    public class Usluga : Entitet
    {
        public int? Trajanje { get; set; }
        public decimal? Cijena { get; set; }
        public string? Naziv { get; set; }
    }
}
