using EdunovaAPP.Data;
using EdunovaAPP.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text;

namespace EdunovaAPP.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class PolaznikController : EdunovaController<Polaznik, PolaznikDTORead, PolaznikDTOInsertUpdate>
    {
        public PolaznikController(EdunovaContext context) : base(context)
        {
            DbSet = _context.Polaznici;
        }
        protected override void KontrolaBrisanje(Polaznik entitet)
        {
            var entitetIzbaze = _context.Polaznici
                .Include(x => x.Grupe)
                .FirstOrDefault(x => x.Sifra == entitet.Sifra);

            if (entitetIzbaze == null)
            {
                throw new Exception("Ne postoji polaznik s šifrom " + entitet.Sifra + " u bazi");
            }
            if (entitetIzbaze.Grupe != null && entitetIzbaze.Grupe.Count > 0)
            {
                StringBuilder sb = new();
                sb.Append("Polaznik se ne može obrisati jer je postavljen na grupama: ");
                foreach (var e in entitetIzbaze.Grupe)
                {
                    sb.Append(e.Naziv).Append(", ");
                }

                throw new Exception(sb.ToString()[..^2]);
            }
        }

    }
}
