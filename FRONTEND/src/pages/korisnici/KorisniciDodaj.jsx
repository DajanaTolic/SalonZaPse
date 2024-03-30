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
            pasmina: parseInt(podaci.get('pasmina')), //na backend je int
            kilaza: parseFloat(podaci.get('kilaza')),
            vlasnik: podaci.get('vlasnik')=='on' ? true : false            
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
                    <Form.Control type="number" name="pasmina" />
                </Form.Group>

                <Form.Group controlId="kilaza">
                    <Form.Label>Kilaza</Form.Label>
                    <Form.Control type="text" name="kilaza" />
                </Form.Group>

                <Form.Group controlId="vlasnik">
                    <Form.Check label="Vlasnik" name="vlasnik" />
                </Form.Group>

                <hr />
                <Row>
                    <Col xs={6} sm={6} md={3} lg={6} xl={1} xxl={2}>
                        <Link className="btn btn-danger siroko" to={RoutesNames.KORISNIK_PREGLED}>
                            Odustani
                        </Link>
                    </Col>
                    <Col xs={6} sm={6} md={9} lg={6} xl={1} xxl={10}>
                        <Button className="siroko" variant="primary" type="submit">
                            Dodaj
                        </Button>
                    </Col>
                </Row>

            </Form>
        </Container>

    );
}