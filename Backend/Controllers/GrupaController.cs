using EdunovaAPP.Data;
using EdunovaAPP.Mappers;
using EdunovaAPP.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text;

namespace EdunovaAPP.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class GrupaController : EdunovaController<Grupa, GrupaDTORead, GrupaDTOInsertUpdate>
    {
        public GrupaController(EdunovaContext context) : base(context)
        {
            DbSet = _context.Grupe;
            _mapper = new MappingGrupa();
        }
        protected override void KontrolaBrisanje(Grupa entitet)
        {
            if (entitet!=null && entitet.Polaznici != null && entitet.Polaznici.Count() > 0)
            {
                StringBuilder sb = new StringBuilder();
                sb.Append("Grupa se ne može obrisati jer su na njon polaznici: ");
                foreach (var e in entitet.Polaznici)
                {
                    sb.Append(e.Ime).Append(' ').Append(e.Prezime).Append(", ");
                }

                throw new Exception(sb.ToString()[..^2]);
            }
        }

        protected override Grupa KreirajEntitet(GrupaDTOInsertUpdate dto)
        {
            var smjer = _context.Smjerovi.Find(dto.SmjerSifra) ?? throw new Exception("Ne postoji smjer s šifrom " + dto.SmjerSifra + " u bazi");
            var predavac = _context.Predavaci.Find(dto.PredavacSifra) ?? throw new Exception("Ne postoji predavač s šifrom " + dto.PredavacSifra + " u bazi");
            var entitet = _mapper.MapInsertUpdatedFromDTO(dto);
            entitet.Polaznici = []; // može i new List<Polaznik>()
            entitet.Smjer = smjer;
            entitet.Predavac = predavac;
            return entitet;
        }

        protected override List<GrupaDTORead> UcitajSve()
        {
            var lista = _context.Grupe
                    .Include(g => g.Smjer)
                    .Include(g => g.Predavac)
                    .Include(g => g.Polaznici)
                    .ToList();
            if (lista == null || lista.Count == 0)
            {
                throw new Exception("Ne postoje podaci u bazi");
            }
            return  _mapper.MapReadList(lista);
        }

        protected override Grupa NadiEntitet(int sifra)
        {
            return _context.Grupe.Include(i => i.Smjer).Include(i => i.Predavac)
                    .Include(i => i.Polaznici).FirstOrDefault(x => x.Sifra == sifra) ?? throw new Exception("Ne postoji grupa s šifrom " + sifra + " u bazi");
        }



        protected override Grupa PromjeniEntitet(GrupaDTOInsertUpdate dto, Grupa entitet)
        {
            var smjer = _context.Smjerovi.Find(dto.SmjerSifra) ?? throw new Exception("Ne postoji smjer s šifrom " + dto.SmjerSifra + " u bazi");
            var predavac = _context.Predavaci.Find(dto.PredavacSifra) ?? throw new Exception("Ne postoji predavač s šifrom " + dto.PredavacSifra + " u bazi");


            /*
            List<Polaznik> polaznici = entitet.Polaznici;
            entitet = _mapper.MapInsertUpdatedFromDTO(dto);
            entitet.Polaznici = polaznici;
            */

            // ovdje je možda pametnije ići s ručnim mapiranje
            entitet.MaksimalnoPolaznika = dto.Maksimalnopolaznika;
            entitet.DatumPocetka = dto.Datumpocetka;
            entitet.Naziv = dto.Naziv;
            entitet.Smjer = smjer;
            entitet.Predavac = predavac;
            
            return entitet;
        }
    }
}
