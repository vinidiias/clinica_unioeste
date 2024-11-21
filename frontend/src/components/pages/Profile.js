import styles from './Profile.module.css'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import PersonalData from '../profile/PersonalData'
import Escolaridade from '../profile/Escolaridade'
import Adress from '../profile/Adress'

const Profile = () => {
  const { pessoa, userData } = useContext(UserContext);
  const [localPessoa, setLocalPessoa] = useState(pessoa); // Estado local para armazenar dados da pessoa

  useEffect(() => {
    // Atualiza o estado local sempre que 'pessoa' mudar
    setLocalPessoa(pessoa);
  }, [pessoa]); // Dependência em 'pessoa'

  const education = {
    level: 'Graduação',
    curso: 'Ciências da Computação',
    periodo: '4° ano',
    turno: 'Manhã'
  }
console.log(userData)
  return (
    <div className={styles.profile}>
        <PersonalData 
          imgProfile={localPessoa.img} // Usando estado local
          nome={userData.name}
          idade={localPessoa.age}
          sex={localPessoa.sexo}
          nascimento={localPessoa.birth}
          CPF={localPessoa.cpf}
          RA={localPessoa.ra}
          mail={userData.email}
          tel={localPessoa.phone}
        />
        <Adress
          adress_completo={localPessoa.adressComplet} // Usando estado local
        />
        <Escolaridade
          education={education} // Presumindo que a educação não muda
        />
    </div>
  );
}

export default Profile;
