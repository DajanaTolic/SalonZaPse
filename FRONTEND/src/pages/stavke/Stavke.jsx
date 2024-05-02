import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { IoIosAdd } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ProgressBar from 'react-bootstrap/ProgressBar';
import moment from "moment";
import Service from "../../services/StavkaService";
import { RoutesNames } from "../../constants";
import useError from "../../hooks/useError";
import useLoading from "../../hooks/useLoading";

export default function Stavke(){
    const [stavke,setStavke] = useState();
    const { showLoading, hideLoading } = useLoading();
    let navigate = useNavigate(); 
    const { prikaziError } = useError();

    async function dohvatiStavke(){
        showLoading();
        const odgovor = await Service.get('Stavke');
        hideLoading();
        if(!odgovor.ok){
            prikaziError(odgovor.podaci);
            return;
        }
        setStavke(odgovor.podaci);
    }

    async function obrisiStavku(sifra) {
        showLoading();
        const odgovor = await Service.obrisi('Stavke',sifra);
        hideLoading();
        prikaziError(odgovor.podaci);
        if (odgovor.ok){
            dohvatiStavke();
        }
    }

    useEffect(()=>{
        dohvatiStavke();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);



    return (

        <Container>
            <Link to={RoutesNames.STAVKA_NOVI} className="btn btn-success siroko">
                <IoIosAdd
                size={25}
                /> Dodaj
            </Link>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Tretman</th>
                        <th>Usluga</th>
                        <th>Kolicina</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {stavke && stavke.map((entitet,index)=>(
                        <tr key={index}>
                            <td>{entitet.tretman}</td>
                            <td>{entitet.uslugaStavka}</td>
                            <td>{entitet.kolicina}</td>
                            
                            <td className="sredina">
                                    <Button
                                        variant='primary'
                                        onClick={()=>{navigate(`/stavke/${entitet.sifra}`)}}
                                    >
                                        <FaEdit 
                                    size={25}
                                    />
                                    </Button>
                               
                                
                                    &nbsp;&nbsp;&nbsp;
                                    <Button
                                        variant='danger'
                                        onClick={() => obrisiStavke(entitet.sifra)}
                                    >
                                        <FaTrash
                                        size={25}/>
                                    </Button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>

    );

}