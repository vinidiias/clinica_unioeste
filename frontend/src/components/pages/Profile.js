import styles from './Profile.module.css'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

import Input from '../form/Input'

import logoPerfil from '../../img/logoPerfil.jpg'

const Profile = () => {
    const [userData, setUserData] = useContext(UserContext)
    console.log(userData)

    return (
      <div className="profile">
        <div className="personal_data">
          <h3>Dados pessoais</h3>
          <div className="infos">
            <div className='itens'>
                <div className="sub_item">
                  <h4>Foto</h4>
                  <img
                    style={{ width: "100px", height: "100px", borderRadius: "50%" }}
                    src={logoPerfil}
                    alt=""
                  />
                </div>
                <div className='sub_item'>
                    <div className="input">
                      <label htmlFor="name">Nome</label>
                      <input type="text" name="name" />
                    </div>
                    <div className="input">
                      <label htmlFor="age">Idade</label>
                      <input type="text" name="age" />
                    </div>
                    <div className="input">
                      <label htmlFor="sexuality">Sexo</label>
                      <select name="sexuality" id="">
                        <option value="F">Feminino</option>
                        <option value="M">Masculino</option>
                      </select>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Profile