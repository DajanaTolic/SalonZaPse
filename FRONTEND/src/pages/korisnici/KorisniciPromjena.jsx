import { useEffect, useState } from "react";
import {  Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Service from "../../services/KorisnikService";
import { RoutesNames } from "../../constants";
import InputText from "../../components/InputText";
import InputCheckbox from "../../components/InputCheckbox";
import Akcije from "../../components/Akcije";
import useError from "../../hooks/useError";
import useLoading from "../../hooks/useLoading";

export default function KorisniciPromjena(){

    const navigate = useNavigate();
    const routeParams = useParams();
    const [korisnik, setKorisnik] = useState({});
    const { prikaziError } = useError();
    const { showLoading, hideLoading } = useLoading();

   async function dohvatiKorisnik(){
    showLoading();
        const odgovor = await Service.getBySifra('Korisnik',routeParams.sifra);
        hideLoading();
        if(!odgovor.ok){
            prikaziError(odgovor.podaci);
            navigate(RoutesNames.KORISNIK_PREGLED);
            return;
        }
        setSmjer(odgovor.podaci);
    }

    useEffect(()=>{
        dohvatiKorisnik();

       },[]);
  
    async function promjeniKorisnik(korisnik){
    const odgovor = await KorisnikService.put(routeParams.sifra,korisnik);
    if (odgovor.greska){
        console.log(odgovor.poruka);
        alert('Pogledaj konzolu');
        return;
    }
    navigate(RoutesNames.KORISNIK_PREGLED);
}

   

    function obradiSubmit(e){ // e predstavlja event
        e.preventDefault();
        //alert('Dodajem korisnik');

        const podaci = new FormData(e.target);

        const korisnik = {
            ime: podaci.get('ime'),  // 'naziv' je name atribut u Form.Control
            pasmina:podaci.get('pasmina'), //na backend je int
            kilaza: podaci.get('kilaza'),
            vlasnik: podaci.get('vlasnik')      
        };
        //console.log(routeParams.sifra);
        //console.log(korisnik);
        promjeni(korisnik);

    }

    return (

        <Container>
            <Form onSubmit={obradiSubmit}>

                <Form.Group controlId="ime">
                    <Form.Label>Ime</Form.Label>
                    <Form.Control 
                    type="text" 
                    name="ime" 
                    defaultValue={korisnik.ime}
                    required />
                </Form.Group>

                <Form.Group controlId="pasmina">
                    <Form.Label>Pasmina</Form.Label>
                    <Form.Control 
                    type="text" 
                    name="pasmina"
                    defaultValue={korisnik.pasmina}
                     />
                </Form.Group>

                <Form.Group controlId="kilaza">
                    <Form.Label>Kilaza</Form.Label>
                    <Form.Control type="number" name="kilaza" defaultValue={korisnik.kilaza} />
                </Form.Group>

                <Form.Group controlId="vlasnik">
                <Form.Label>Vlasnik</Form.Label>
                    <Form.Control type="text" name="vlasnik" defaultValue={korisnik.vlasnik} />
                </Form.Group>

                <hr />
                <Row>
                    <Col>
                        <Link className="btn btn-danger siroko" to={RoutesNames.KORISNIK_PREGLED}>
                            Odustani
                        </Link>
                    </Col>
                    <Col>
                        <Button className="siroko" variant="primary" type="submit">
                            Promjeni
                        </Button>
                    </Col>
                </Row>

            </Form>
        </Container>

    );
}