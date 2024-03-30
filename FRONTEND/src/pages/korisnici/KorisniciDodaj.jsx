import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import KorisnikService from "../../services/KorisnikService";


export default function KorisnikDodaj(){
    const navigate = useNavigate();

    async function dodaj(korisnik){
        const odgovor = await KorisnikService.post(korisnik);
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
            pasmina: podaci.get('pasmina'), //na backend je int
            kilaza: parseInt(podaci.get('kilaza')),
            vlasnik: podaci.get('vlasnik')          
        };

        //console.log(korisnik);
        dodaj(korisnik);

    }

    return (

        <Container>
            <Form onSubmit={obradiSubmit}>

                <Form.Group controlId="ime">
                    <Form.Label>Ime</Form.Label>
                    <Form.Control type="text" name="ime" required />
                </Form.Group>

                <Form.Group controlId="pasmina">
                    <Form.Label>Pasmina</Form.Label>
                    <Form.Control type="text" name="pasmina" />
                </Form.Group>

                <Form.Group controlId="kilaza">
                    <Form.Label>Kilaza</Form.Label>
                    <Form.Control type="number" name="kilaza" />
                </Form.Group>

                <Form.Group controlId="vlasnik">
                    <Form.Label>Vlasnik</Form.Label>
                    <Form.Control type="text" name="vlasnik" />
                </Form.Group>
                <hr />
                <Row>
                    <Col>
                        <Link className="btn btn-danger siroko" to={RoutesNames.KORISNIK_PREGLED}>
                            Odustani
                        </Link>
                    </Col>
                    <Col >
                        <Button className="siroko" variant="primary" type="submit">
                            Dodaj
                        </Button>
                    </Col>
                </Row>

            </Form>
        </Container>

    );
}