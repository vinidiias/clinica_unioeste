import './App.css';
import  {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { UserProvider } from './components/context/UserContext'
import RoleBasedComponent from './components/util/RoleBasedComponent';
import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';
import Container from './components/layout/Container';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Contato from './components/pages/Contato';
import Ficha from './components/pages/Ficha';
import Profile from './components/pages/Profile'
import ScreeningQueue from './components/pages/ScreeningQueue';
import InvitePsychologist from './components/pages/InvitePsychologist';
import ViewFicha from './components/ficha/ViewFicha';
import CreateFicha from './components/ficha/CreateFicha';
import Auth from './components/pages/Auth';
import UserLogin from './components/pages/UserLogin';
import UserRegister from './components/pages/UserRegister';

function App() {
  return (
    <div className="app">
      <Router>
        <UserProvider>
          <NavBar />
          <Routes>
            <Route
              path="/login"
              element={
                <Container customClass="align">
                  <UserLogin />
                </Container>
              }
            />
            <Route
              path="/register"
              element={
                <Container customClass="align">
                  <UserRegister />
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
              path="/ficha/createFicha"
              element={
                <Container customClass="auto">
                  <CreateFicha />
                </Container>
              }
            />
            <Route
              path="/psychologist/screening"
              element={
                <RoleBasedComponent allowedRoles={["admin", "psicologo"]}>
                  <Container customClass="height">
                    <ScreeningQueue />
                  </Container>
                </RoleBasedComponent>
              }
            />
            <Route
              path="/psychologist/screening/:id"
              element={
                <RoleBasedComponent allowedRoles={["admin", "psicologo"]}>
                  <Container customClass="height">
                    <ViewFicha />
                  </Container>
                </RoleBasedComponent>
              }
            />
            <Route
              path="admin/invite/psychologist"
              element={
                <RoleBasedComponent allowedRoles={["admin"]}>
                  <Container customClass="align">
                    <InvitePsychologist />
                  </Container>
                </RoleBasedComponent>
              }
            />
            <Route
              path="admin/invite/admin"
              element={
                <RoleBasedComponent allowedRoles={["admin"]}>
                  <Container customClass="align">
                    <InvitePsychologist inviteAdmin={true} />
                  </Container>
                </RoleBasedComponent>
              }
            />
            <Route
              path="/register/psychologist"
              element={
                <Container customClass="align">
                  <Auth registerPsychologist={true} />
                </Container>
              }
            />
            <Route
              path="/register/admin"
              element={
                <Container customClass="align">
                  <Auth registerAdmin={true} />
                </Container>
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
