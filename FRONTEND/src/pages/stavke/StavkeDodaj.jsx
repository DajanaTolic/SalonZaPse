import { Container, Form} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Service from '../../services/StavkaService';
import { RoutesNames } from '../../constants';
import InputText from '../../components/InputText';
import Akcije from '../../components/Akcije';
import moment from 'moment';
import useError from "../../hooks/useError";
import useLoading from "../../hooks/useLoading";



export default function StavkeDodaj() {
  const navigate = useNavigate();

  const [tretman, setTretmane] = useState([]);
  const [tretmanSifra, setTretmanSifra] = useState(0);

  const [usluge, setUsluge] = useState([]);
  const [uslugaSifra, setUslugaSifra] = useState(0);
  const { prikaziError } = useError();
  const { showLoading, hideLoading } = useLoading();

  async function dohvatiTretmane(){
    const odgovor = await Service.get('Tretman');
    if(!odgovor.ok){
      prikaziError(odgovor.podaci);
      return;
    }
    setTretmani(odgovor.podaci);
    setTretmanSifra(odgovor.podaci[0].sifra);
  }

  async function dohvatiUsluge(){
    const odgovor = await Service.get('Usluga');
    if(!odgovor.ok){
      prikaziError(odgovor.podaci);
        return;
    }
    setUsluge(odgovor.podaci);
    setUslugaSifra(odgovor.podaci[0].sifra);
  }

  async function ucitaj(){
    showLoading();
    await dohvatitretmane();
    await dohvatiUsluge();
    hideLoading();
  }

  useEffect(()=>{
    ucitaj();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  async function dodaj(e) {
    showLoading();
    const odgovor = await Service.dodaj('Stavka',e);
    hideLoading();
    if(odgovor.ok){
      navigate(RoutesNames.STAVKA_PREGLED);
      return
    }
    prikaziError(odgovor.podaci);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const podaci = new FormData(e.target);

    

    dodaj({
      kolicina: podaci.get('kolicina'),
      tretmanSifra: parseInt(tretmanSifra),
      uslugaSifra: parseInt(uslugaSifra),
      
    });
  }

  return (
    <Container className='mt-4'>
      <Form onSubmit={handleSubmit}>

        <InputText atribut='naziv' vrijednost='' />


        <Form.Group className='mb-3' controlId='tretman'>
          <Form.Label>Tretman</Form.Label>
          <Form.Select multiple={true}
          onChange={(e)=>{setTretmanSifra(e.target.value)}}
          >
          {tretmani && tretmani.map((s,index)=>(
            <option key={index} value={s.sifra}>
              {s.naziv}
            </option>
          ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className='mb-3' controlId='usluga'>
          <Form.Label>Usluga</Form.Label>
          <Form.Select
          onChange={(e)=>{setUslugaSifra(e.target.value)}}
          >
          {usluge && usluge.map((e,index)=>(
            <option key={index} value={e.sifra}>
              {s.naziv}
            </option>
          ))}
          </Form.Select>
        </Form.Group>

        <Akcije odustani={RoutesNames.STAVKA_PREGLED} akcija='Dodaj stavku' /> 
      </Form>
    </Container>
  );
}