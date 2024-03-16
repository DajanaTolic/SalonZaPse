using Backend.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Reflection.Emit;

namespace Backend.Data
{
    public class SalonZaPseContext : DbContext
    {

        public SalonZaPseContext(DbContextOptions<SalonZaPseContext> options) : base(options)
        {




        }
        public DbSet<Korisnik> Korisnici { get; set; }

        public DbSet<Usluga> Usluge { get; set; }

       






    }
}
