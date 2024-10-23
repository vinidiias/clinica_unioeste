import './App.css';

import  {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
//import { useContext } from 'react';

//import { UserContext, UserProvider } from './context/UserContext';

import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';
import Container from './components/layout/Container';

import Login from './components/pages/Login'
import RegisterForm from './components/login/RegisterForm';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Contato from './components/pages/Contato';
import Ficha from './components/pages/Ficha';

function App() {
  return (
    <div className="app">
      <Router>
        <NavBar />
        <Routes>
          <Route path='/' element={<Container customClass='align' ><Login /></Container>} />
          <Route path='/register' element={<Container customClass='align' ><RegisterForm/></Container>} />
          <Route path='/home' element={<Container customClass='height'><Home /></Container>} />
          <Route path='/about' element={<Container customClass='height'><About /></Container>} />
          <Route path='/contact' element={<Container customClass='height'><Contato /></Container>} />
          <Route path='/ficha' element={<Container customClass='auto'><Ficha /></Container>} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
