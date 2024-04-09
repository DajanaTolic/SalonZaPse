﻿using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Tretman : Entitet

    {
        public DateTime Datum { get; set; }

        [ForeignKey("Korisnik")]
        public Korisnik? Korisnik { get; set; }
    }
}
