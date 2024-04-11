using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public record KorisnikDTORead (string Ime, string Pasmina, decimal Kilaza, string Vlasnik );

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

    public record StavkaDTORead (
        int Tretman,
        string UslugaStavka,
        int KolicinaStavka
        );

    public record StavkaDTOInsertUpdate (
          [Required(ErrorMessage = " Tretman obavezno")]
            int? Tretman,
            [Required(ErrorMessage = "Usluga obavezno")]
            string? UslugaStavka,
            [Required(ErrorMessage = "Kolicina obavezno")]
            int? KolicinaStavka
        );

    public record TretmanDTORead(
        DateTime Datum,
        string KorisnikTretman);

        public record TretmanDTOInsertUpdate(
          [Required(ErrorMessage = " Datum obavezno")]
            DateTime? Datum,
            [Required(ErrorMessage = "Korisnik obavezno")]
            string? KorisnikTretman
          
        );


}
