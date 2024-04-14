using Backend.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Reflection.Emit;
using System.Text.RegularExpressions;

namespace Backend.Data
{
    public class SalonZaPseContext : DbContext
    {

        public SalonZaPseContext(DbContextOptions<SalonZaPseContext> options) : base(options)
        {




        }
        public DbSet<Korisnik> Korisnici { get; set; }

        public DbSet<Usluga> Usluge { get; set; }

        public DbSet<Tretman> Tretmani { get; set; }

        public DbSet<Stavka> Stavke { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            // implementacija veze 1:n
            modelBuilder.Entity<Tretman>().HasOne(g => g.Korisnik);

            modelBuilder.Entity<Stavka>().HasOne(g => g.Usluga);
            modelBuilder.Entity<Stavka>().HasOne(g => g.Tretman);




        }
    }
}