import styles from './Profile.module.css'
import { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'
import logoPerfil from '../../img/logoPerfil.jpg'


import PersonalData from '../profile/PersonalData'
import Escolaridade from '../profile/Escolaridade'
import Adress from '../profile/Adress'

const Profile = () => {
  const {pessoa} = useContext(UserContext)

  let education = {
    level: 'graduacao',
    curso: 'Ciências da Computação',
    periodo: '4° ano',
    turno: 'Manhã'
  }

  return (
    <div className={styles.profile}>
        <PersonalData 
          img={logoPerfil}
          nome={pessoa.name}
          idade={pessoa.age}
          nascimento={pessoa.birth}
          CPF={pessoa.cpf}
          RA={pessoa.ra}
          mail={pessoa.email}
          tel={pessoa.phone}
        />
        <Escolaridade
          education={education}
        />

        <Adress
          adress_completo={pessoa.adress_completo}
        />
    </div>
  );
}

export default Profile