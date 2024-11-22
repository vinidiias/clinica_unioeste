import styles from './Profile.module.css'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loading from '../layout/Loading'
import PersonalData from '../profile/PersonalData'
import Escolaridade from '../profile/Escolaridade'
import Adress from '../profile/Adress'
import api from '../../services/Api'
import { calcularIdade } from '../util/CalculaIdade'
import { UserContext } from '../context/UserContext'

const Profile = () => {
  const { setUserData } = useContext(UserContext)
  const navigate = useNavigate()
  const [localUser, setLocalUser] = useState({})
  const [localPessoa, setLocalPessoa] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      const user = JSON.parse(sessionStorage.getItem('user'))

      setUserData(prevStat => ({
        ...prevStat,
        isFirst: user.isFirst,
        email: user.email,
        name: user.name,
        user_id: user.user_id,
      }))

      try{
        const getPessoa = await api.get(`/${user.user_id}/pessoa`, {
          headers: { auth: `${user.user_id}` },
        });
        
        if(!getPessoa) navigate('/')
  
        const data = getPessoa.data[0]

        setLocalUser(user)
        setLocalPessoa(data)
  
      } catch(err) {
        console.log(err)
      }
    }
    fetchData()
  }, [navigate, localPessoa, localUser, setUserData])



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
            imgProfile={localPessoa.img}
            nome={localUser.name}
            idade={calcularIdade(localPessoa.birth)}
            sex={localPessoa.sexo}
            nascimento={localPessoa.birth}
            CPF={localPessoa.cpf}
            RA={localPessoa.ra}
            mail={localUser.email}
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
