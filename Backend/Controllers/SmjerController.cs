using EdunovaAPP.Data;
using EdunovaAPP.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text;

namespace EdunovaAPP.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class SmjerController : EdunovaController<Smjer,SmjerDTORead,SmjerDTOInsertUpdate>
    {
        public SmjerController(EdunovaContext context) : base(context)
        {
            DbSet=_context.Smjerovi;
        }
        protected override void KontrolaBrisanje(Smjer entitet)
        {
            var lista = _context.Grupe
                .Include(x => x.Smjer)
                .Where(x => x.Smjer.Sifra == entitet.Sifra)
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
