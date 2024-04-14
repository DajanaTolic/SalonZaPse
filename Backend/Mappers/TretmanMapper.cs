
using AutoMapper;
using Backend.Models;

namespace Backend.Mappers
{

    public class TretmanMapper : Mapping<Tretman, TretmanDTORead, TretmanDTOInsertUpdate>
    {

        public TretmanMapper()
        {
            MapperMapReadToDTO = new Mapper(new MapperConfiguration(c => {
                c.CreateMap<Tretman, TretmanDTORead>()
                .ConstructUsing(entitet =>
                 new TretmanDTORead(
                    entitet.Sifra,
                    entitet.Datum,
                    entitet.Korisnik.Ime




                    ));
            }));

            MapperMapInsertUpdatedFromDTO = new Mapper(new MapperConfiguration(c => {
                c.CreateMap<TretmanDTOInsertUpdate, Tretman>();
            }));

            MapperMapInsertUpdateToDTO = new Mapper(new MapperConfiguration(c => {
                c.CreateMap<Tretman, TretmanDTOInsertUpdate>()
                .ConstructUsing(entitet =>
                 new TretmanDTOInsertUpdate(

                    entitet.Datum,
                   entitet.Sifra
                    ));




            }));
        }




    }
}
