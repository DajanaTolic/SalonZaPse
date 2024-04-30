import { useState, useEffect, useRef } from 'react';
import { Container, Form, Row, Col, Table, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import Service from '../../services/GrupaService';
import { App, RoutesNames } from '../../constants';
import InputText from '../../components/InputText';
import Akcije from '../../components/Akcije';
import PolaznikService from "../../services/PolaznikService";
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { FaTrash } from 'react-icons/fa';
import useError from "../../hooks/useError";
import nepoznato from '../../assets/nepoznato.png'; 
import useLoading from "../../hooks/useLoading";


export default function GrupePromjeni() {
  const navigate = useNavigate();
  const routeParams = useParams();
  const [grupa, setGrupa] = useState({});

  const [smjerovi, setSmjerovi] = useState([]);
  const [sifraSmjer, setSifraSmjer] = useState(0);

  const [predavaci, setPredavaci] = useState([]);
  const [sifraPredavac, setSifraPredavac] = useState(0);

  
  const [polaznici, setPolaznici] = useState([]);
  const [pronadeniPolaznici, setPronadeniPolaznici] = useState([]);
  const { prikaziError } = useError();
  const { showLoading, hideLoading } = useLoading();

  const typeaheadRef = useRef(null);


  async function dohvatiGrupa() {
    const odgovor = await Service.getBySifra('Grupa',routeParams.sifra);
    if(!odgovor.ok){
      prikaziError(odgovor.podaci);
      return;
    }
    let grupa = odgovor.podaci;
    grupa.vrijeme =moment.utc(grupa.datumpocetka).format('HH:mm');
    grupa.datum= moment.utc(grupa.datumpocetka).format('yyyy-MM-DD');
    delete grupa.datumpocetka;
    setGrupa(grupa);
    setSifraSmjer(grupa.smjerSifra);
    if(grupa.predavacSifra!=null){
      setSifraPredavac(grupa.predavacSifra);
    }       
  }

 

  async function dohvatiSmjerovi() {
    const odgovor =  await Service.get('Smjer');
    if(!odgovor.ok){
      prikaziError(odgovor.podaci);
      return;
    }
    setSmjerovi(odgovor.podaci);
    setSifraSmjer(odgovor.podaci[0].sifra);
      
  }

  async function dohvatiPredavaci() {
    const odgovor =  await Service.get('Predavac');
    if(!odgovor.ok){
      prikaziError(odgovor.podaci);
      return;
    }
    setPredavaci(odgovor.podaci);
    setSifraPredavac(odgovor.podaci[0].sifra);
  }

 

  async function dohvatiInicijalnePodatke() {
    showLoading();
    await dohvatiSmjerovi();
    await dohvatiPredavaci();
    await dohvatiGrupa();
    await dohvatiPolaznici();
    hideLoading();
  }

  async function dohvatiPolaznici() {
    const odgovor = await Service.getPolaznici('Grupa',routeParams.sifra);
    if(!odgovor.ok){
      prikaziError(odgovor.podaci);
      return;
    }
    setPolaznici(odgovor.podaci);
  }

  async function traziPolaznik(uvjet) {
    const odgovor =  await PolaznikService.traziPolaznik('Polaznik',uvjet);
    if(!odgovor.ok){
      prikaziError(odgovor.podaci);
      return;
    }
    setPronadeniPolaznici(odgovor.podaci);
  }

  async function obrisiPolaznika(grupa, polaznik) {
    showLoading();
    const odgovor = await Service.obrisiPolaznika('Grupa',grupa, polaznik);
    hideLoading();
    if(odgovor.ok){
      await dohvatiPolaznici();
      return;
    }
    prikaziError(odgovor.podaci);
  }

  async function dodajPolaznika(e) {
    showLoading();
    const odgovor = await Service.dodajPolaznika('Grupa',routeParams.sifra, e[0].sifra);
    hideLoading();
    if(odgovor.ok){
      await dohvatiPolaznici();
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
    const odgovor = await Service.promjeni('Grupa',routeParams.sifra, e);
    hideLoading();
    if(odgovor.ok){
      navigate(RoutesNames.GRUPA_PREGLED);
      return;
    }
    prikaziError(odgovor.podaci);
  }

  function slika(polaznik){
    if(polaznik.slika!=null){
        return App.URL + polaznik.slika+ `?${Date.now()}`;
    }
    return nepoznato;
  }



  function handleSubmit(e) {
    e.preventDefault();

    const podaci = new FormData(e.target);
    const datum = moment.utc(podaci.get('datum') + ' ' + podaci.get('vrijeme'));

    promjeni({
      naziv: podaci.get('naziv'),
      datumpocetka: datum,
      smjerSifra: parseInt(sifraSmjer), 
      predavacSifra: parseInt(sifraPredavac),
      maksimalnopolaznika: parseInt(podaci.get('maksimalnopolaznika'))
    });
    
  }

  return (
    <Container className='mt-4'>
      <Row>
        <Col key='1' sm={12} lg={6} md={6}>
          <Form onSubmit={handleSubmit}>
            <InputText atribut='naziv' vrijednost={grupa.naziv} />
            <Row>
              <Col key='1' sm={12} lg={6} md={6}>
                <Form.Group className='mb-3' controlId='datum'>
                  <Form.Label>Datum</Form.Label>
                  <Form.Control
                    type='date'
                    name='datum'
                    defaultValue={grupa.datum}
                  />
                </Form.Group>
              </Col>
              <Col key='2' sm={12} lg={6} md={6}>
                <Form.Group className='mb-3' controlId='vrijeme'>
                  <Form.Label>Vrijeme</Form.Label>
                  <Form.Control
                    type='time'
                    name='vrijeme'
                    defaultValue={grupa.vrijeme}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className='mb-3' controlId='smjer'>
              <Form.Label>Smjer</Form.Label>
              <Form.Select
                value={sifraSmjer}
                onChange={(e) => {
                  setSifraSmjer(e.target.value);
                }}>
                {smjerovi &&
                  smjerovi.map((smjer, index) => (
                    <option key={index} value={smjer.sifra}>
                      {smjer.naziv}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className='mb-3' controlId='predavac'>
              <Form.Label>Predavač</Form.Label>
              <Form.Select
                value={sifraPredavac}
                onChange={(e) => {
                  setSifraPredavac(e.target.value);
                }}>
                {predavaci &&
                  predavaci.map((predavac, index) => (
                    <option key={index} value={predavac.sifra}>
                      {predavac.ime} {predavac.prezime}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>
            <InputText atribut='maksimalnopolaznika' vrijednost={grupa.maksimalnopolaznika} />
            <Akcije odustani={RoutesNames.GRUPA_PREGLED} akcija='Promjeni grupu' /> 
          </Form>
        </Col>
        <Col key='2' sm={12} lg={6} md={6}>
        <Form.Group className='mb-3' controlId='uvjet'>
          <Form.Label>Traži polaznika</Form.Label>
            <AsyncTypeahead
            className='autocomplete'
            id='uvjet'
            emptyLabel='Nema rezultata'
            searchText='Tražim...'
            labelKey={(polaznik) => `${polaznik.prezime} ${polaznik.ime}`}
            minLength={3}
            options={pronadeniPolaznici}
            onSearch={traziPolaznik}
            placeholder='dio imena ili prezimena'
            renderMenuItemChildren={(polaznik) => (
              <>
                <span>
                <img src={slika(polaznik)} style={{maxWidth: '50px'}} />  {polaznik.prezime} {polaznik.ime}
                </span>
              </>
            )}
            onChange={dodajPolaznika}
            ref={typeaheadRef}
            />
          </Form.Group>
          <div style={{overflow: 'auto', maxHeight:'400px'}}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Polaznici na grupi</th>
                <th>Akcija</th>
              </tr>
            </thead>
            <tbody>
              {polaznici &&
                polaznici.map((polaznik, index) => (
                  <tr key={index}>
                    <td>
                      <img src={slika(polaznik)} style={{maxWidth: '50px'}} />
                       {polaznik.ime} {polaznik.prezime}
                      
                    </td>
                    <td>
                      <Button variant='danger' onClick={() =>
                          obrisiPolaznika(routeParams.sifra, polaznik.sifra)
                        } >
                        <FaTrash />
                      </Button>
      
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          </div>
        </Col>
      </Row>
      
    </Container>
  );
}