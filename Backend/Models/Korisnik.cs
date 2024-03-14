namespace Backend.Models
{
    public class Korisnik : Entitet
    {
        public string? Ime { get; set; }
        public string? Pasmina { get; set; }
        public decimal? Kilaza { get; set; }
        public string? Vlasnik { get; set; }
    }
}
