import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import KorisnikService from '../../services/KorisnikService';
import { Button, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { RoutesNames } from '../../constants';

export default function Korisnici() {
    const [korisnici, setKorisnici] = useState();
    const navigate = useNavigate();

    async function dohvatiKorisnike() {
        await KorisnikService.get()
            .then((odg) => {
                setKorisnici(odg);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    useEffect(() => {
        dohvatiKorisnike();
    }, []);

    async function obrisiAsync(sifra) {
        const odgovor = await KorisnikService._delete(sifra);
        if (odgovor.greska) {
            console.log(odgovor.poruka);
            alert('Pogledaj konzolu');
            return;
        }
        dohvatiKorisnike();
    }

    function obrisi(sifra) {
        obrisiAsync(sifra);
    }


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
                                    onClick={()=>obrisi(korisnik.sifra)}
                                    variant='danger'
                                    >
                                        Obriši
                                    </Button>
                                        {/* kosi jednostruki navodnici `` su AltGR (desni) + 7 */}
                                    <Button 
                                    onClick={()=>{navigate(`/Korisnik/${korisnik.sifra}`)}} 
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