using AutoMapper;
using Backend.Mappers;
using Backend.Models;
using System.Text.RegularExpressions;

namespace Backend.Mapping
{
    public class StavkeMapping : Mapping<Stavka, StavkaDTORead, StavkaDTOInsertUpdate>
    {

        public StavkeMapping()
        {
            MapperMapReadToDTO = new Mapper(new MapperConfiguration(c => {
                c.CreateMap<Stavka, StavkaDTORead>()
                .ConstructUsing(entitet =>
                 new StavkaDTORead(
                    entitet.Sifra,

                    entitet.Usluga.Naziv,
                    entitet.Tretman.Sifra,
                    entitet.Kolicina



                    ));
            }));

            MapperMapInsertUpdatedFromDTO = new Mapper(new MapperConfiguration(c => {
                c.CreateMap<StavkaDTOInsertUpdate, Stavka>();
            }));

            MapperMapInsertUpdateToDTO = new Mapper(new MapperConfiguration(c => {
                c.CreateMap<Stavka, StavkaDTOInsertUpdate>()
                .ConstructUsing(entitet =>
                 new StavkaDTOInsertUpdate(



                    entitet.Tretman.Sifra,
                    entitet.Usluga.Naziv,
                    entitet.Kolicina
                    ));
            })); ; ;
        }
    }
}




            
        