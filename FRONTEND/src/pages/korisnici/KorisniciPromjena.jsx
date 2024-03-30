import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RoutesNames } from "../../constants";
import KorisnikService from "../../services/KorisnikService";
import { useEffect, useState } from "react";


export default function KorisniciPromjena(){
    const navigate = useNavigate();
    const routeParams = useParams();
    const [korisnik, setKorisnik] = useState({});

   async function dohvatiKorisnik(){
        const o = await KorisnikService.getBySifra(routeParams.sifra);
        if(o.greska){
            console.log(o.poruka);
            alert('pogledaj konzolu');
            return;
        }
        setKorisnik(o.poruka);
   }

   async function promjeni(korisnik){
    const odgovor = await KorisnikService.put(routeParams.sifra,korisnik);
    if (odgovor.greska){
        console.log(odgovor.poruka);
        alert('Pogledaj konzolu');
        return;
    }
    navigate(RoutesNames.KORISNIK_PREGLED);
}

   useEffect(()=>{
    dohvatiKorisnik();
   },[]);

    function obradiSubmit(e){ // e predstavlja event
        e.preventDefault();
        //alert('Dodajem korisnik');

        const podaci = new FormData(e.target);

        const korisnik = {
            ime: podaci.get('ime'),  // 'naziv' je name atribut u Form.Control
            pasmina: parseInt(podaci.get('pasmina')), //na backend je int
            kilaza: parseFloat(podaci.get('kilaza')),
            vlasnik: podaci.get('vlasnik')=='on' ? true : false            
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
                    type="number" 
                    name="pasmina"
                    defaultValue={korisnik.pasmina}
                     />
                </Form.Group>

                <Form.Group controlId="kilaza">
                    <Form.Label>Kilaza</Form.Label>
                    <Form.Control type="text" name="kilaza" defaultValue={korisnik.cijena} />
                </Form.Group>

                <Form.Group controlId="vlasnika">
                    <Form.Check label="Vlasnik" name="vlasnik" defaultChecked={korisnik.verificiran   } />
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