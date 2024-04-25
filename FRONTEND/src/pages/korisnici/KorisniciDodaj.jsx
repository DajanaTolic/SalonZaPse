import { Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import Service from "../../services/KorisnikService";
import InputText from "../../components/InputText";
import InputCheckbox from "../../components/InputCheckbox";
import Akcije from "../../components/Akcije";
import useError from "../../hooks/useError";
import useLoading from "../../hooks/useLoading";

export default function KorisnikDodaj(){
    const navigate = useNavigate();
    const { prikaziError } = useError();
    const { showLoading, hideLoading } = useLoading();

    async function dodajKorisnik(korisnik){
        showLoading();
        const odgovor = await Service.dodaj('Korisnik',korisnik);
        hideLoading();
        if(odgovor.ok){
          navigate(RoutesNames.KORISNIK_PREGLED);
          return
        }
        prikaziError(odgovor.podaci);
    }

    function handleSubmit(e){ // e predstavlja event
        e.preventDefault();
         const podaci = new FormData(e.target);
         dodajKorisnik({
            ime: podaci.get('ime'),  // 'naziv' je name atribut u Form.Control
            pasmina: podaci.get('pasmina'), //na backend je int
            kilaza: parseInt(podaci.get('kilaza')),
            vlasnik: podaci.get('vlasnik')          
        });
    }

    return (

        <Container>
            <Form onSubmit={handleSubmit}>
            <InputText atribut='ime' vrijednost='' />
                <InputText atribut='pasmina' vrijednost='' />
                <InputText atribut='kilaza' vrijednost='' />
                <InputText atribut='vlasnik' vrijednost='' />
                <Akcije odustani={RoutesNames.KORISNIK_PREGLED} akcija='Dodaj korisnika' />
            </Form>
        </Container>

    );
}