import './App.css';
import  {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { UserProvider } from './components/context/UserContext'
import RoleBasedComponent from './components/util/RoleBasedComponent';
import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';
import Container from './components/layout/Container';
import Login from './components/pages/Login'
import Home from './components/pages/Home';
import About from './components/pages/About';
import Contato from './components/pages/Contato';
import Ficha from './components/pages/Ficha';
import Profile from './components/pages/Profile'
import ScreeningQueue from './components/pages/ScreeningQueue';
import InvitePsychologist from './components/pages/InvitePsychologist';

function App() {
  return (
    <div className="app">
      <Router>
        <UserProvider>
          <NavBar />
          <Routes>
            <Route
              path="/"
              element={
                <Container customClass="align">
                  <Login />
                </Container>
              }
            />
            <Route
              path="/invite/psychologist"
              element={
                <Container customClass="align">
                  <InvitePsychologist />
                </Container>
              }
            />
            <Route
              path="/home"
              element={
                <Container customClass="height">
                  <Home />
                </Container>
              }
            />
            <Route
              path="/profile"
              element={
                <Container customClass="height">
                  <Profile />
                </Container>
              }
            />
            <Route
              path="/about"
              element={
                <Container customClass="height">
                  <About />
                </Container>
              }
            />
            <Route
              path="/contact"
              element={
                <Container customClass="height">
                  <Contato />
                </Container>
              }
            />
            <Route
              path="/ficha"
              element={
                <Container customClass="auto">
                  <Ficha />
                </Container>
              }
            />
            <Route
              path="/screening"
              element={
                <RoleBasedComponent allowedRoles={["admin", "moderator"]}>
                  <Container customClass="height">
                    <ScreeningQueue />
                  </Container>
                </RoleBasedComponent>
              }
            />
          </Routes>
          <Footer />
        </UserProvider>
      </Router>
    </div>
  );
}

export default App;
