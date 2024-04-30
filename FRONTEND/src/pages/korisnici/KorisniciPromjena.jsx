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
        setKorisnik(odgovor.podaci);
    }

    useEffect(()=>{
        dohvatiKorisnik();

       },[]);
  
    async function promjeniKorisnik(korisnik){
        showLoading();
        const odgovor = await Service.promjeni('Korisnik', routeParams.sifra,korisnik);
        hideLoading();
    if (odgovor.ok){
        navigate(RoutesNames.KORISNIK_PREGLED);
        return;
    }
    prikaziError(odgovor.podaci);
}

   
    function handleSubmit(e){ // e predstavlja event
        e.preventDefault();
        const podaci = new FormData(e.target);
        promjeniKorisnik({
            ime: podaci.get('ime'),  // 'naziv' je name atribut u Form.Control
            pasmina:podaci.get('pasmina'), //na backend je int
            kilaza: podaci.get('kilaza'),
            vlasnik: podaci.get('vlasnik')      
        });
    }



    return (
        <Container>
            <Form onSubmit={handleSubmit}>

            <InputText atribut='ime' vrijednost={korisnik.ime} />
                    <InputText atribut='pasmina' vrijednost={korisnik.pasmina} />
                    <InputText atribut='kilaza' vrijednost={korisnik.kilaza} />
                    <InputText atribut='vlasnik' vrijednost={korisnik.vlasnik} />
                    <Akcije odustani={RoutesNames.KORISNIK_PREGLED} akcija='Promjeni korisnika' />

            </Form>
        </Container>

    );
}