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
          
        }

    }
}