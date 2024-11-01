import { useContext, useEffect, useState } from 'react';
import styles from './PersonalData.module.css'
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import api from '../../services/Api';


const PersonalData =  ({ customClass, onClose, imgProfile, nome='', idade='', sex='M', nascimento='', CPF='', RA='', mail='', tel='', endereco, endereco_num }) => {
    const [edit, setEdit] = useState(true)
    const [img, setImg] = useState(imgProfile)
    const [name, setName] = useState(nome)
    const [age, setAge] = useState(idade)
    const [sexo, setSexo] = useState(sex)
    const [birth, setBirth] = useState(nascimento)
    const [cpf, setCpf] = useState(CPF)
    const [ra, setRa] = useState(RA)
    const [email, setEmail] = useState(mail)
    const [phone, setPhone] = useState(tel)
    const [adress, setAdress] = useState(endereco)
    const [number, setNumber] = useState(endereco_num)
    const {userData, setUserData} = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(() => {
      if(customClass === 'column') setEdit(false)
    }, [edit, customClass])

    function handleFileChange(e) {
      const file = e.target.files[0]

      if(file){
        setImg(URL.createObjectURL(file))
        console.log(img)
      }
    }

    function editToggle() {
        setEdit(!edit)
        console.log(edit)
    }

    function validateInputs(data) {
      if((!data.adressComplet.adress || data.adressComplet.adress === '') || 
          !data.adressComplet.number || data.adressComplet.number === '') {
            return 0
      }
      for(let key in data) {
        if(!data[key] || data[key] === '') return 0
      }
      return 1
    }

    async function submitHandle() {
      const personal_data = {
        name,
        age,
        sexo,
        birth,
        cpf,
        ra,
        email,
        phone,
        adressComplet : {
          adress,
          number
        }
      }

      if(validateInputs(personal_data)) {

        setUserData(prevStat => ({
          ...prevStat,
          isFirst: false,
        }))
        onClose()
        navigate('/home')
      }
      else alert('Campos vázios! Preencha todas as informações')
      try {
        const personCreated = await api.post('/pessoa', {
          img,
          name,
          age,
          sexo,
          birth,
          cpf,
          ra,
          email,
          phone})
 
      } catch(err) {
        console.log(err)
      }
    }

    function editHandle(){
      const personal_data = {
        name,
        age,
        sexo,
        birth,
        cpf,
        ra,
        email,
        phone
      }
      console.log(personal_data)
      editToggle()
    }

    return (
      <div className={styles.containers + " " + styles.margin}>
        <div className={styles.header}>
          <h3>Dados pessoais</h3>
        </div>
        <div className={styles.infos + " " + styles[customClass]}>
          <div className={styles.divImg}>
            <label htmlFor="name">Foto</label>
            {img && !edit ? (
              <>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <button className={styles.editButtonImg}>Editar</button>
                  <img
                    className={styles.img}
                    src={img}
                    alt="foto perfil"
                  />
                </div>
              </>
            ) : img ? (
              <img
                className={styles.imgEdit}
                src={img}
                alt="foto perfil"
              />
            ) : (
              <label htmlFor="file-img">
                
                <input
                  id="file-img"
                  name="file-img"
                  className={styles.file}
                  placeholder="teste"
                  type="file"
                  accept="image/png, image/jpeg"
                  required
                  onChange={handleFileChange}
                />
                <span>Selecionar</span>
              </label>
            )}
          </div>
          <div className={styles.item}>
            <div className={styles.input}>
              <label htmlFor="name">Nome</label>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                disabled={edit}
                type="text"
                name="name"
                id="name"
                autoComplete="additional-name"
              />
            </div>
            <div className={styles.input}>
              <label htmlFor="age">Idade</label>
              <input
                onChange={(e) => setAge(e.target.value)}
                value={age}
                disabled={edit}
                type="text"
                name="age"
                id="age"
              />
            </div>
            <div className={styles.input}>
              <label htmlFor="sexuality">Sexo</label>
              <select
                onChange={(e) => setSexo(e.target.value)}
                value={sexo}
                disabled={edit}
                name="sexuality"
                id="sexuality"
              >
                <option value="M">Masculino</option>
                <option value="F">Feminino</option>
              </select>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.input}>
              <label htmlFor="birth">Data de nascimento</label>
              <input
                onChange={(e) => setBirth(e.target.value)}
                value={birth}
                disabled={edit}
                type="date"
                name="birth"
                id="birth"
              />
            </div>
            <div className={styles.input}>
              <label htmlFor="cpf">CPF</label>
              <input
                onChange={(e) => setCpf(e.target.value)}
                value={cpf}
                disabled={edit}
                type="text"
                name="cpf"
                id="cpf"
              />
            </div>
            <div className={styles.input}>
              <label htmlFor="ra">RA</label>
              <input
                onChange={(e) => setRa(e.target.value)}
                value={ra}
                disabled={edit}
                type="text"
                name="ra"
                id="ra"
              />
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.input}>
              <label htmlFor="phone">Telefone</label>
              <input
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                disabled={edit}
                type="text"
                name="phone"
                id="phone"
                autoComplete="home tel"
              />
            </div>
            <div className={styles.input}>
              <label htmlFor="email">Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                disabled={edit}
                type="email"
                name="email"
                id="email"
                autoComplete="home email"
              />
            </div>
            {customClass === "column" && (
              <div className={styles.item}>
                <div className={styles.input}>
                  <label htmlFor="adress">Endereço</label>
                  <input
                    disabled={edit}
                    type="text"
                    name="adress"
                    id="adress"
                    onChange={(e) => setAdress(e.target.value)}
                  />
                </div>
                <div className={styles.input}>
                  <label htmlFor="number">Número</label>
                  <input
                    disabled={edit}
                    type="text"
                    name="number"
                    id="number"
                    onChange={(e) => setNumber(e.target.value)}
                  />
                </div>
              </div>
            )}
            <div className={styles.submitEdit}>
              {userData.isFirst ? (
                <button onClick={submitHandle}>Confirmar</button>
              ) : (
                <>
                  <button onClick={editToggle}>Editar dados</button>
                  {!edit && <button onClick={editHandle}>Confirmar</button>}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
}

export default PersonalData