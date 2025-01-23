import styles from './index.module.css'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loading from '../../layout/Loading'
import PersonalData from './PersonalData'
import Escolaridade from './Education'
import Adress from './Adress'
import api from '../../../services/Api'
import { calcularIdade } from '../../util/CalculaIdade'
import { UserContext } from '../../context/UserContext'
import withAuthenticated from '../../../hocs/withAuthenticated'

const Profile = () => {
  const { userData, setUserData } = useContext(UserContext)
  const navigate = useNavigate()
  const [pessoa, setPessoa] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      console.log(userData)
      /*setUserData(prevStat => ({
        ...prevStat,
        isFirst: userData.isFirst,
        email: userData.email,
        name: userData.name,
        user_id: userData.user_id,
      }))*/

      try{
        const getPessoa = await api.get(`/${userData.user_id}/pessoa`, {
          headers: { auth: `${userData.user_id}` },
        })
        .then((data) => {
          console.log(data.data)
          setPessoa(data.data)})
        .catch((error) => {
          console.log(error)
          navigate('/login')
        })
    
      } catch(err) {
        console.log(err)
      }
    }
    fetchData()
  }, [navigate, setUserData])



  const education = {
    level: 'Graduação',
    course: 'Ciências da Computação',
    period: '4° ano',
    shift: 'Manhã'
  }

  return (
    <>
      {Object.keys(pessoa).length === 0 ? (
        <Loading />
      ) : (
        <div className={styles.profile}>
          <PersonalData
            imgProfile={pessoa.img}
            nome={userData.name}
            idade={calcularIdade(pessoa.birth)}
            sex={pessoa.sexo}
            nascimento={pessoa.birth}
            CPF={pessoa.cpf}
            RA={pessoa.ra}
            mail={userData.email}
            tel={pessoa.phone}
          />
          <Adress
            adress_complet={pessoa.adressComplet} // Usando estado local
          />
          <Escolaridade
            education={education} // Presumindo que a educação não muda
          />
        </div>
      )}
    </>
  );
}

export default withAuthenticated(Profile)
