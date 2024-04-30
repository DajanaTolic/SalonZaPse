import { Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import Service from "../../services/UslugaService";
import InputText from "../../components/InputText";
import InputCheckbox from "../../components/InputCheckbox";
import Akcije from "../../components/Akcije";
import useError from "../../hooks/useError";
import useLoading from "../../hooks/useLoading";

export default function UslugaDodaj(){
    const navigate = useNavigate();
    const { prikaziError } = useError();
    const { showLoading, hideLoading } = useLoading();

    async function dodajUsluga(Usluga){
        showLoading();
        const odgovor = await Service.dodaj('Usluga',Usluga);
        hideLoading();
        if(odgovor.ok){
          navigate(RoutesNames.USLUGA_PREGLED);
          return
        }
        prikaziError(odgovor.podaci);
    }

    function handleSubmit(e){ // e predstavlja event
        e.preventDefault();
         const podaci = new FormData(e.target);
         dodajUsluga({
            trajanje: podaci.get('trajanje'),  // 'naziv' je name atribut u Form.Control
            cijena: podaci.get('cijena'), //na backend je int
            naziv: podaci.get('naziv')          
        });
    }

    return (

        <Container>
            <Form onSubmit={handleSubmit}>
            <InputText atribut='trajanje' vrijednost='' />
                <InputText atribut='cijena' vrijednost='' />
                <InputText atribut='naziv' vrijednost='' />
                <Akcije odustani={RoutesNames.USLUGA_PREGLED} akcija='Dodaj uslugu' />
            </Form>
        </Container>

    );
}