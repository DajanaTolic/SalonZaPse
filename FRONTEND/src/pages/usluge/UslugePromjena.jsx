import { useEffect, useState } from "react";
import {  Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Service from "../../services/UslugaService";
import { RoutesNames } from "../../constants";
import InputText from "../../components/InputText";
import InputCheckbox from "../../components/InputCheckbox";
import Akcije from "../../components/Akcije";
import useError from "../../hooks/useError";
import useLoading from "../../hooks/useLoading";

export default function UslugePromjena(){

    const navigate = useNavigate();
    const routeParams = useParams();
    const [usluga, setUsluge] = useState({});
    const { prikaziError } = useError();
    const { showLoading, hideLoading } = useLoading();

   async function dohvatiUsluga(){
    showLoading();
        const odgovor = await Service.getBySifra('Usluga',routeParams.sifra);
        hideLoading();
        if(!odgovor.ok){
            prikaziError(odgovor.podaci);
            navigate(RoutesNames.USLUGA_PREGLED);
            return;
        }
        setUsluge(odgovor.podaci);
    }

    useEffect(()=>{
        dohvatiUsluga();

       },[]);
  
    async function promjeniUsluga(usluga){
        showLoading();
        const odgovor = await Service.promjeni('Usluga', routeParams.sifra,usluga);
        hideLoading();
    if (odgovor.ok){
        navigate(RoutesNames.USLUGA_PREGLED);
        return;
    }
    prikaziError(odgovor.podaci);
}

   
    function handleSubmit(e){ // e predstavlja event
        e.preventDefault();
        const podaci = new FormData(e.target);
        promjeniUsluga({
            trajanje: podaci.get('trajanje'),  // 'naziv' je name atribut u Form.Control
            cijena:podaci.get('cijena'), //na backend je int
            naziv: podaci.get('naziv'),    
        });
    }



    return (
        <Container>
            <Form onSubmit={handleSubmit}>

            <InputText atribut='trajanje' vrijednost={usluga.trajanje} />
                    <InputText atribut='cijena' vrijednost={usluga.cijena} />
                    <InputText atribut='naziv' vrijednost={usluga.naziv} />
                    <Akcije odustani={RoutesNames.USLUGA_PREGLED} akcija='Promjeni uslugu' />

            </Form>
        </Container>

    );
}