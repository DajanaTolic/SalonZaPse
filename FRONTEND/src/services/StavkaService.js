import  {get,obrisi,dodaj,getBySifra,promjeni,dohvatiPorukeAlert, obradiUspjeh, obradiGresku, httpService } from "./HttpService";

async function getStavke(naziv,sifra){
    return await httpService.get('/' + naziv + '/Stavke/' + sifra).then((res)=>{return obradiUspjeh(res);}).catch((e)=>{ return obradiGresku(e);});
  }
  async function dodajStavku(tretman, usluga, kolicina) {
    return await httpService.post('/' + tretman + '/' + usluga + '/dodaj/' + kolicina).then((res)=>{return obradiUspjeh(res);}).catch((e)=>{ return obradiGresku(e);});
  }
  async function obrisiStavku(tretman, usluga, kolicina) {
    return await httpService.delete('/'+tretman +'/' + usluga + '/obrisi/' + kolicina).then((res)=>{return obradiUspjeh(res);}).catch((e)=>{ return obradiGresku(e);});
  }

export default{
    get,
    obrisi,
    dodaj,
    promjeni,
    getBySifra,
    dohvatiPorukeAlert,

    getStavke,
    dodajStavku,
    obrisiStavku
};