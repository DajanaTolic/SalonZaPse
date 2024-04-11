using Backend.Data;
using Backend.Mappers;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text;

namespace Backend.Controllers
{
   
        [ApiController]
        [Route("api/v1/[controller]")]
        public class TretmanController : EdunovaController<Tretman, TretmanDTORead, TretmanDTOInsertUpdate>
        {
            public TretmanController(SalonZaPseContext context) : base(context)
            {
                DbSet = _context.Tretmani;
                _mapper = new TretmanMapper();


            }
            protected override void KontrolaBrisanje(Tretman entitet)
            {
                var lista = _context.Korisnici
                    .Where(x => x.Sifra == entitet.Sifra)
                    .ToList();
                if (lista != null && lista.Count > 0)
                {
                    StringBuilder sb = new();
                    sb.Append("Unos se ne može obrisati jer je postavljen Ulov: ");
                    foreach (var e in lista)
                    {
                        sb.Append(e).Append(", ");
                    }
                    throw new Exception(sb.ToString()[..^2]); // umjesto sb.ToString().Substring(0, sb.ToString().Length - 2)
                }
            }

            protected override List<TretmanDTORead> UcitajSve()
            {
                var lista = _context.Tretmani
                        .Include(g => g.Korisnik)

                        .ToList();
                if (lista == null || lista.Count == 0)
                {
                    throw new Exception("Ne postoje podaci u bazi");
                }
                return _mapper.MapReadList(lista);
            }
            protected override Tretman KreirajEntitet(TretmanDTOInsertUpdate dto)
            {
                var Korisnik = _context.Korisnici.FirstOrDefault(k => k.Sifra.ToString() == dto.KorisnikTretman);
                if (Korisnik == null)
                {
                    throw new Exception("Ne postoji korisnik s imenom " + dto.KorisnikTretman + " u bazi");
                }

                var entitet = _mapper.MapInsertUpdatedFromDTO(dto);
                entitet.Korisnik = Korisnik;
                entitet.Datum = dto.Datum;
                

                return entitet;
            }



            protected override Unos NadiEntitet(int id)
            {

                return _context.Unosi
                               .Include(i => i.Korisnik)
                               .FirstOrDefault(x => x.id == id)
                       ?? throw new Exception("Ne postoji Unos s šifrom " + id + " u bazi");
            }

            protected override Unos PromjeniEntitet(UnosDTOInsertUpdate dto, Unos entitet)
            {
                var Korisnik = _context.Korisnici.Find(dto.ImePrezime) ?? throw new Exception("Ne postoji Korisnik s šifrom " + dto.ImePrezime + " u bazi");
                // ovdje je možda pametnije ići s ručnim mapiranje
                entitet.Korisnik = Korisnik;
                entitet.Datum = dto.Datum;
                entitet.Vodostaj = dto.Vodostaj;
                entitet.Biljeska = dto.Biljeska;

                return entitet;
            }
        }


    }

}
}
