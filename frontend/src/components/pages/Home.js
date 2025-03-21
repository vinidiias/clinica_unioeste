import styles from './Home.module.css'
import System from '../system/System';
import RoleBasedComponent from '../util/RoleBasedComponent';
import { useNavigate } from 'react-router-dom';
import { FaPlusCircle } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { FcCustomerSupport } from "react-icons/fc";
import { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';

const Home = () => {
  const { userData } = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!userData.isLogged) {
      navigate("/");
    }
  });

  const navigateficha = () => {
    navigate('/ficha/create-ficha')
  }
  const navigateprofile = () => {
    navigate('/profile')
  }
  const navigateconsult = () => {
    navigate('/psychologist/queue/screening')
  }
  const navigatehistory = () => {
    navigate('/history')
  }
  const navigateInvite = () => {
    navigate('/admin/invite/psychologist')
  }

    return (
      <div className={styles.home}>
        <div className={styles.systems}>
          <System
            text="Dados Pessoais"
            icon={<FaHistory style={{ color: "#fff" }} />}
            handleClick={navigateprofile}
          />
          <System
            text="Solicitar consulta"
            icon={<FaPlusCircle style={{ color: "#fff" }} />}
            handleClick={navigateficha}
          />
          <RoleBasedComponent allowedRoles={["admin", "psicologo"]}>
            <System
              text="Atender pacientes"
              icon={<FcCustomerSupport />}
              handleClick={navigateconsult}
            />
          </RoleBasedComponent>
          <System
            text="Sua Consulta"
            icon={<FaHistory style={{ color: "#fff" }} />}
            handleClick={navigatehistory}
          />
          <System
            text="Convidar Psicológo"
            icon={<FaHistory style={{ color: "#fff" }} />}
            handleClick={navigateInvite}
          />
        </div>
      </div>
    );
}

export default Home