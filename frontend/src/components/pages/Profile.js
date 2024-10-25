import styles from './Profile.module.css'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import logoPerfil from '../../img/logoPerfil.jpg'


import PersonalData from '../profile/PersonalData'

const Profile = () => {
  const [userData, setUserData] = useContext(UserContext)


  return (
    <div className={styles.profile}>
        <PersonalData 
          img={logoPerfil}
          name="Vinícius Dias"
          age="22"
          birth="2002-02-09"
          cpf="11424771935"
          ra="220919"
          phone="45 991330882"
          email="vinidiias@outlook.com.br"
        />
    </div>
  );
}

export default Profile