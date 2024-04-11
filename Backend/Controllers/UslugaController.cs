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
    public class UslugaController : EdunovaController <Usluga, UslugaDTORead, UslugaDTOInsertUpdate>
    {
        public UslugaController(SalonZaPseContext context) : base(context)
        {
            DbSet = _context.Usluge;
        }
        protected override void KontrolaBrisanje(Usluga entitet)
        {
            var lista = _context.Usluge
                
                .Where(x => x.Sifra == entitet.Sifra)
                .ToList();
            if (lista != null && lista.Count > 0)
            {
                StringBuilder sb = new();
                sb.Append("Smjer se ne može obrisati jer je postavljen na grupama: ");
                foreach (var e in lista)
                {
                    sb.Append(e.Naziv).Append(", ");
                }
                throw new Exception(sb.ToString()[..^2]); // umjesto sb.ToString().Substring(0, sb.ToString().Length - 2)
            }
        }

    }
}