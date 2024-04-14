using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Text;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class KorisnikController : EdunovaController <Korisnik, KorisnikDTORead, KorisnikDTOInsertUpdate>
    {
        public KorisnikController(SalonZaPseContext context) : base(context)
        {
            DbSet = _context.Korisnici;
        }
        protected override void KontrolaBrisanje(Korisnik entitet)
        {
            var lista = _context.Tretmani

                .Where(x => x.Korisnik.Ime == entitet.Sifra.ToString())
                .ToList();
            if (lista != null && lista.Count > 0)
            {
                StringBuilder sb = new();
                sb.Append("korisnik se ne može obrisati jer je postavljen na tretmanu: ");
                foreach (var e in lista)
                {
                    sb.Append(e.Korisnik).Append(", ");
                }
                throw new Exception(sb.ToString()[..^2]); // umjesto sb.ToString().Substring(0, sb.ToString().Length - 2)
            }
        }

    }
}