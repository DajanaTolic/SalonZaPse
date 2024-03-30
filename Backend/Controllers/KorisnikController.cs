using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class KorisnikController:ControllerBase

        
    {
        private readonly SalonZaPseContext _contex;

       
        public KorisnikController (SalonZaPseContext contex) { _contex = contex; }




        [HttpGet]

        public IActionResult Get()
        {
            return new JsonResult(_contex.Korisnici.ToList());
        }


        [HttpGet]
        [Route("{sifra:int}")]

        public IActionResult GetBySifra(int sifra) 
        {
            return new JsonResult(_contex.Korisnici.Find(sifra));
       
        }

        [HttpPost]
        public IActionResult Post(Korisnik korisnik)
        {
            _contex.Korisnici.Add(korisnik);
            _contex.SaveChanges();


            return new JsonResult(korisnik);
        }



        [HttpDelete]
        [Route("{id:int}")]
        [Produces("application/json")]

        public IActionResult Delete(int id)
        {
            var SmjerIzBaze = _contex.Korisnici.Find(id);

            _contex.Korisnici.Remove(SmjerIzBaze);
            _contex.SaveChanges();
            return new JsonResult(new  { poruka = "obrisano" });


        }
        [HttpPut]
        [Route("{id:int}")]


        public IActionResult Put(int id ,  Korisnik korisnik)
        {
            var SmjerIzBaze = _contex.Korisnici.Find(id);
            SmjerIzBaze.Ime = korisnik.Ime;
            SmjerIzBaze.Kilaza = korisnik.Kilaza;
            SmjerIzBaze.Vlasnik = korisnik.Vlasnik;
            SmjerIzBaze.Pasmina = korisnik.Pasmina;

            _contex.Korisnici.Update(SmjerIzBaze);
            _contex.SaveChanges();


            return new JsonResult(SmjerIzBaze);
        }




    }
}
