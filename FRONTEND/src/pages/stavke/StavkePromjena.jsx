import { useState, useEffect, useRef } from 'react';
import { Container, Form, Row, Col, Table, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import Service from '../../services/StavkaService';
import { App, RoutesNames } from '../../constants';
import InputText from '../../components/InputText';
import Akcije from '../../components/Akcije';
import PolaznikService from "../../services/StavkaService";
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { FaTrash } from 'react-icons/fa';
import useError from "../../hooks/useError";
import useLoading from "../../hooks/useLoading";


export default function StavkePromjeni() {
  const navigate = useNavigate();
  const routeParams = useParams();
  const [stavka, setStavke] = useState({});

  const [tretmani, setTretmani] = useState([]);
  const [sifraTretman, setSifraTretman] = useState(0);

  const [usluge, setUsluge] = useState([]);
  const [sifraUsluga, setSifraUsluga] = useState(0);

  
  const [kolicina, setKolicina] = useState([]);
  const [pronadeneKolicine, setPronadeneKolicine] = useState([]);
  const { prikaziError } = useError();
  const { showLoading, hideLoading } = useLoading();

  const typeaheadRef = useRef(null);


  
  async function dohvatiTretman() {
    const odgovor =  await Service.get('Tretman');
    if(!odgovor.ok){
      prikaziError(odgovor.podaci);
      return;
    }
    setTretmani(odgovor.podaci);
    setSifraTretman(odgovor.podaci[0].sifra);
      
  }

  async function dohvatiUsluga() {
    const odgovor =  await Service.get('Usluga');
    if(!odgovor.ok){
      prikaziError(odgovor.podaci);
      return;
    }
    setUsluge(odgovor.podaci);
    setSifraUsluga(odgovor.podaci[0].sifra);
  }

 

  async function dohvatiInicijalnePodatke() {
    showLoading();
    await dohvatiTretman();
    await dohvatiUsluga();
    await dohvatiKolicina();
    hideLoading();
  }

  async function dohvatikolicina() {
    const odgovor = await Service.getKolicina('Stavka',routeParams.sifra);
    if(!odgovor.ok){
      prikaziError(odgovor.podaci);
      return;
    }
    setKolicina(odgovor.podaci);
  }

  async function traziKolicina(uvjet) {
    const odgovor =  await KolicinaService.traziKolicina('Kolicina',uvjet);
    if(!odgovor.ok){
      prikaziError(odgovor.podaci);
      return;
    }
    setPronadenaKoloicina(odgovor.podaci);
  }

  async function obrisiKolicina(stavka, kolicina) {
    showLoading();
    const odgovor = await Service.obrisiKolicina('Stavka',stavka, kolicina);
    hideLoading();
    if(odgovor.ok){
      await dohvatiKolicine();
      return;
    }
    prikaziError(odgovor.podaci);
  }

  async function dodajKolicine(e) {
    showLoading();
    const odgovor = await Service.dodajKolicinu('Stavka',routeParams.sifra, e[0].sifra);
    hideLoading();
    if(odgovor.ok){
      await dohvatiKolicine();
      typeaheadRef.current.clear();
      return;
    }
    prikaziError(odgovor.podaci);
  }

  useEffect(() => {
    dohvatiInicijalnePodatke();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function promjeni(e) {
    showLoading();
    const odgovor = await Service.promjeni('Stavka',routeParams.sifra, e);
    hideLoading();
    if(odgovor.ok){
      navigate(RoutesNames.STAVKA_PREGLED);
      return;
    }
    prikaziError(odgovor.podaci);
  }


  function handleSubmit(e) {
    e.preventDefault();

    const podaci = new FormData(e.target);
    

    promjeni({
      kolicina: podaci.get('kolicina'),
      tretmanSifra: parseInt(sifraTretman), 
      uslugaSifra: parseInt(sifraUsluga),
      
    });
    
  }

  return (
    <Container className='mt-4'>
      idem
      
    </Container>
  );
}