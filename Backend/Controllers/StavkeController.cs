using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Backend.Data;
using Backend.Mapping;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class StavkeController : EdunovaController<Stavka, StavkaDTORead, StavkaDTOInsertUpdate>
    {
        public StavkeController(SalonZaPseContext context) : base(context)
        {
            DbSet = _context.Stavke;
            _mapper = new StavkeMapping();


        }
        protected override void KontrolaBrisanje(Stavka entitet)
        {
            var lista = _context.Usluge
               .Where(x => x.Sifra == entitet.Sifra)
               .ToList();
            if (lista != null && lista.Count > 0)
            {
                StringBuilder sb = new();
                sb.Append("Stavke  se ne mogu obrisati jer je postavljen Tretman: ");
                foreach (var e in lista)
                {
                    sb.Append(e).Append(", ");
                }
                throw new Exception(sb.ToString()[..^2]); // umjesto sb.ToString().Substring(0, sb.ToString().Length - 2)
            }
        }

        protected override List<StavkaDTORead> UcitajSve()
        {
            var lista = _context.Stavke
                    .Include(g => g.Usluga)
                    .Include(g => g.Tretman)


                    .ToList();
            if (lista == null || lista.Count == 0)
            {
                throw new Exception("Ne postoje podaci u bazi");
            }
            return _mapper.MapReadList(lista);
        }
        protected override Stavka KreirajEntitet(StavkaDTOInsertUpdate dto)
        {
            var usluga = _context.Usluge.FirstOrDefault(k => k.Naziv == dto.UslugaStavka);
            if (usluga == null)
            {
                throw new Exception("Ne postoji usluga  s  sifrom  " + dto.UslugaStavka + " u bazi");
            }
            var tretman = _context.Tretmani.FirstOrDefault(k => k.Sifra == dto.TretmanStavka);
            if (tretman == null)
            {
                throw new Exception("Ne postoji tretman s  sifrom  " + dto.TretmanStavka + " u bazi");
            }

            var entitet = _mapper.MapInsertUpdatedFromDTO(dto);
            entitet.Tretman = tretman;
            entitet.Usluga = usluga;

           
            entitet.Kolicina = dto.Kolicina;
            

            return entitet;
        }

        protected override Stavka NadiEntitet(int Sifra)
        {
            return _context.Stavke
                           .Include(Stavka => Stavka.Tretman)
                           .Include(Stavka => Stavka.Usluga)
                           .FirstOrDefault(stavka => stavka.Sifra == Sifra)
                   ?? throw new Exception("Ne postoji stavka s šifrom " + Sifra + " u bazi");
        }


        protected override Stavka PromjeniEntitet(StavkaDTOInsertUpdate dto, Stavka entitet)
        {
            var usluga = _context.Usluge.Find(dto.UslugaStavka) ?? throw new Exception("Ne postoji usluga s šifrom " + dto.UslugaStavka + " u bazi");
            // ovdje je možda pametnije ići s ručnim mapiranje
            var tretman = _context.Tretmani.Find(dto.TretmanStavka) ?? throw new Exception("Ne postoji tretman s šifrom " + dto.TretmanStavka + " u bazi");

            entitet.Usluga = usluga;
            entitet.Tretman = tretman;
            entitet.Kolicina = dto.Kolicina;


            return entitet;
        }
    }



}
