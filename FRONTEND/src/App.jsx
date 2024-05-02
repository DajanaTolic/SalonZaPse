
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import NavBar from './components/NavBar'
import { Route, Routes } from 'react-router-dom'
import { RoutesNames } from './constants'

import Pocetna from './pages/Pocetna'

import Korisnici from './pages/korisnici/Korisnici'
import KorisniciDodaj from './pages/korisnici/KorisniciDodaj'
import KorisniciPromjena from './pages/korisnici/KorisniciPromjena'

import Stavke from './pages/stavke/Stavke'
import StavkeDodaj from './pages/stavke/StavkeDodaj'
import StavkePromjena from './pages/stavke/StavkePromjena'

import Usluge from "./pages/usluge/Usluge"
import UslugeDodaj from './pages/usluge/UslugeDodaj'
import UslugePromjena from "./pages/usluge/UslugePromjena"

import ErrorModal from './components/ErrorModal'
import LoadingSpinner from './components/LoadingSpinner'
import useError from './hooks/useError'

function App() {

  const { errors, prikaziErrorModal, sakrijError } = useError();


  return (
    <>


      <ErrorModal show={prikaziErrorModal} errors={errors} onHide={sakrijError} />
      <LoadingSpinner />
      <NavBar />
      <Routes>

        <Route path={RoutesNames.HOME} element={<Pocetna />} />

        <Route path={RoutesNames.KORISNIK_PREGLED} element={<Korisnici />} />
        <Route path={RoutesNames.KORISNIK_NOVI} element={<KorisniciDodaj />} />
        <Route path={RoutesNames.KORISNIK_PROMJENA} element={<KorisniciPromjena />} />

        <Route path={RoutesNames.USLUGA_PREGLED} element={<Usluge />} />
        <Route path={RoutesNames.USLUGA_NOVI} element={<UslugeDodaj />} />
        <Route path={RoutesNames.USLUGA_PROMJENA} element={<UslugePromjena />} />
        
        <Route path={RoutesNames.STAVKA_PREGLED} element={<Stavke />} />
        <Route path={RoutesNames.STAVKA_NOVI} element={<StavkeDodaj />} />
        <Route path={RoutesNames.STAVKA_PROMJENA} element={<StavkePromjena />} />
        
      </Routes>
    </>
  )
}

export default App
