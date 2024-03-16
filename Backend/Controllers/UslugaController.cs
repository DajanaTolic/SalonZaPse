using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class UslugaController : ControllerBase


    {

        private readonly SalonZaPseContext _contex;



        public UslugaController(SalonZaPseContext contex) { _contex = contex; }
        [HttpGet]

        public IActionResult Get()
        {
            return new JsonResult(_contex.Usluge.ToList());
        }

        [HttpPost]
        public IActionResult Post(Usluga usluga)
        {
            _contex.Usluge.Add(usluga);
            _contex.SaveChanges();


            return new JsonResult(usluga);
        }

        [HttpDelete]
        [Route("{id:int}")]
        [Produces("application/json")]

        public IActionResult Delete(int id)
        {
            var SmjerIzBaze = _contex.Usluge.Find(id);

            _contex.Usluge.Remove(SmjerIzBaze);
            _contex.SaveChanges();
            return new JsonResult(new { poruka = "obrisano" });


        }
        [HttpPut]
        [Route("{id:int}")]


        public IActionResult Put(int id, Usluga usluga)
        {
            var SmjerIzBaze = _contex.Usluge.Find(id);
            SmjerIzBaze.Trajanje = usluga.Trajanje;
            SmjerIzBaze.Cijena = usluga.Cijena;
            SmjerIzBaze.Naziv = usluga.Naziv;
            

            _contex.Usluge.Update(SmjerIzBaze);
            _contex.SaveChanges();


            return new JsonResult(SmjerIzBaze);
        }




    }
}
