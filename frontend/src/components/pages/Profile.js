import styles from './Profile.module.css'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import Loading from '../layout/Loading'
import PersonalData from '../profile/PersonalData'
import Escolaridade from '../profile/Escolaridade'
import Adress from '../profile/Adress'
import api from '../../services/Api'
import { calcularIdade } from '../util/CalculaIdade'

const Profile = () => {
  const { setPessoa, pessoa, userData } = useContext(UserContext);
  const storedUser = JSON.parse(sessionStorage.getItem('user'))
  const navigate = useNavigate()
  const [localPessoa, setLocalPessoa] = useState({})

  useEffect(() => async () => {
    try{
      const getPessoa = await api.get(`/${storedUser.user_id}/pessoa`, {
        headers: { auth: `${storedUser.user_id}` },
      })
      
      if(!getPessoa) navigate('/')

      const data = getPessoa.data[0]

      setLocalPessoa(data)

    } catch(err) {
      console.log(err)
    }
  }, [])



  const education = {
    level: 'Graduação',
    curso: 'Ciências da Computação',
    periodo: '4° ano',
    turno: 'Manhã'
  }

  return (
    <>
      {Object.keys(localPessoa).length === 0 ? (
        <Loading />
      ) : (
        <div className={styles.profile}>
          <PersonalData
            nome={storedUser.name}
            idade={calcularIdade(localPessoa.birth)}
            sex={localPessoa.sexo}
            nascimento={localPessoa.birth}
            CPF={localPessoa.cpf}
            RA={localPessoa.ra}
            mail={storedUser.email}
            tel={localPessoa.phone}
          />
          <Adress
            adress_completo={localPessoa.adressComplet} // Usando estado local
          />
          <Escolaridade
            education={education} // Presumindo que a educação não muda
          />
        </div>
      )}
    </>
  );
}

export default Profile;
