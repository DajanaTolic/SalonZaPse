using EdunovaAPP.Data;
using EdunovaAPP.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text;

namespace EdunovaAPP.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class PredavacController : EdunovaController<Predavac, PredavacDTORead, PredavacDTOInsertUpdate>
    {
        public PredavacController(EdunovaContext context) : base(context)
        {
            DbSet = _context.Predavaci;
        }

        protected override void KontrolaBrisanje(Predavac entitet)
        {
            var lista = _context.Grupe
                .Include(x => x.Predavac)
                .Where(x => x.Predavac!=null && x.Predavac.Sifra == entitet.Sifra)
                .ToList();
            if (lista != null && lista.Count > 0)
            {
                StringBuilder sb = new();
                sb.Append("Predavač se ne može obrisati jer je postavljen na grupama: ");
                foreach (var e in lista)
                {
                    sb.Append(e.Naziv).Append(", ");
                }
                throw new Exception(sb.ToString()[..^2]);
            }
        }
    }
}
