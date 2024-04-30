import { useEffect, useState } from 'react';
import {  Button, Container, Table } from "react-bootstrap";
import Service from '../../services/UslugaService';
import { NumericFormat } from "react-number-format";
import { GrValidate } from "react-icons/gr";
import { IoIosAdd } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import useError from "../../hooks/useError";
import useLoading from "../../hooks/useLoading";


export default function Usluga() {
    const [usluge, setUsluge] = useState();
    const navigate = useNavigate();
    const { prikaziError } = useError();
    const { showLoading, hideLoading } = useLoading();

    
    async function dohvatiUsluge() {
        showLoading();
        const odgovor = await Service.get('Usluga');
        hideLoading();
        if(!odgovor.ok){
            prikaziError(odgovor.podaci);
            return;
        }
        setUsluge(odgovor.podaci);
    }

    async function obrisiUsluga(sifra){
        showLoading();
        const odgovor = await Service.obrisi('Usluga',sifra);
        hideLoading();
        prikaziError(odgovor.podaci);
        if (odgovor.ok){
            dohvatiUsluge();
        }
    }
    
    
    useEffect(() => {
        dohvatiUsluge();
    }, []);


    return(
        <>
           <Container>
            <Link to={RoutesNames.USLUGA_NOVI}> Dodaj </Link>
            <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>trajanje</th>
                            <th>cijena</th>
                            <th>naziv</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usluge && usluge.map((Usluga,index)=>(
                            <tr key={index}>
                                <td>{Usluga.trajanje}</td>
                                <td>{Usluga.cijena}</td>
                                <td>{Usluga.naziv}</td>
                               


                                <td>
                                    <Button 
                                    onClick={()=>obrisiUsluga(Usluga.sifra)}
                                    variant='danger'
                                    >
                                        Obriši
                                    </Button>
                                        {/* kosi jednostruki navodnici `` su AltGR (desni) + 7 */}
                                    <Button 
                                    onClick={()=>{navigate(`/usluge/${Usluga.sifra}`)}} 
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