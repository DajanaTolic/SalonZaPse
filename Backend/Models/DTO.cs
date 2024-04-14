using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public record KorisnikDTORead (int Sifra,string Ime, string Pasmina, decimal Kilaza, string Vlasnik );

    public record KorisnikDTOInsertUpdate (
        [Required(ErrorMessage = "Ime obavezno")]
        string? Ime,
        [Required(ErrorMessage = "Pasmina obavezno")]
        string? Pasmina,
        [Required(ErrorMessage = "Kilaza obavezno")]
        decimal? Kilaza,
        [Required(ErrorMessage = "Vlasnik obavezno")]
        string? Vlasnik
        );

    public record UslugaDTORead (
        int Sifra,
        int Trajanje,
        decimal Cijena, 
        string Naziv);
        
        public record UslugaDTOInsertUpdate (
            [Required(ErrorMessage = "Trajanje obavezno")]
            int? Trajanje,
            [Required(ErrorMessage = "Cijena obavezno")]
            decimal? Cijena,
            [Required(ErrorMessage = "Naziv obavezno")]
            string? Naziv
            );

    public record StavkaDTORead (int Sifra,
                string? UslugaStavka,

        int? TretmanStavka,
        int Kolicina
        );

    public record StavkaDTOInsertUpdate (
        
          [Required(ErrorMessage = " Tretman obavezno")]
            int? TretmanStavka,
            [Required(ErrorMessage = "Usluga obavezno")]
            string? UslugaStavka,
            [Required(ErrorMessage = "Kolicina obavezno")]
            int Kolicina
        );

    public record TretmanDTORead(
        int Sifra,
        DateTime Datum,
       string KorisnikTretman);

        public record TretmanDTOInsertUpdate(
          [Required(ErrorMessage = " Datum obavezno")]
            DateTime Datum,
            [Required(ErrorMessage = "Korisnik obavezno")]
            int KorisnikTretman
          
        );


}
