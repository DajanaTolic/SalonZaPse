import { useEffect, useState } from 'react';
import {  Button, Container, Table } from "react-bootstrap";
import Service from '../../services/KorisnikService';
import { NumericFormat } from "react-number-format";
import { GrValidate } from "react-icons/gr";
import { IoIosAdd } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import useError from "../../hooks/useError";
import useLoading from "../../hooks/useLoading";


export default function Korisnici() {
    const [korisnici, setKorisnici] = useState();
    const navigate = useNavigate();
    const { prikaziError } = useError();
    const { showLoading, hideLoading } = useLoading();

    
    async function dohvatiKorisnike() {
        showLoading();
        const odgovor = await Service.get('Korisnik');
        hideLoading();
        if(!odgovor.ok){
            prikaziError(odgovor.podaci);
            return;
        }
        setKorisnici(odgovor.podaci);
    }

    async function obrisiKorisnik(sifra){
        showLoading();
        const odgovor = await Service.obrisi('Korisnik',sifra);
        hideLoading();
        prikaziError(odgovor.podaci);
        if (odgovor.ok){
            dohvatiKorisnike();
        }
    }
    
    
    useEffect(() => {
        dohvatiKorisnike();
    }, []);


    return(
        <>
           <Container>
            <Link to={RoutesNames.KORISNIK_NOVI}> Dodaj </Link>
            <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Ime</th>
                            <th>pasmina</th>
                            <th>kilaza</th>
                            <th>vlasnik</th>
                        </tr>
                    </thead>
                    <tbody>
                        {korisnici && korisnici.map((korisnik,index)=>(
                            <tr key={index}>
                                <td>{korisnik.ime}</td>
                                <td>{korisnik.pasmina}</td>
                                <td>{korisnik.kilaza}</td>
                                <td>{korisnik.vlasnik}</td>


                                <td>
                                    <Button 
                                    onClick={()=>obrisiKorisnik(korisnik.sifra)}
                                    variant='danger'
                                    >
                                        Obriši
                                    </Button>
                                        {/* kosi jednostruki navodnici `` su AltGR (desni) + 7 */}
                                    <Button 
                                    onClick={()=>{navigate(`/korisnici/${korisnik.sifra}`)}} 
                                    >
                                        Promjeni
                                    </Button>
                                </td>




                           
                            </tr>
                        ))}
                    </tbody>
            </Table>
           </Container>
        </>
    );
}