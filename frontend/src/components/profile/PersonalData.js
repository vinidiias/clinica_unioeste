import styles from './PersonalData.module.css'
import api from '../../services/Api';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import days from 'dayjs'


const PersonalData =  ({ customClass, onClose, imgProfile='', nome='', idade='', sex='M', nascimento='', CPF='', RA='', mail='', tel=''}) => {
    const [edit, setEdit] = useState(true)
    const [img, setImg] = useState(imgProfile)
    const [name, setName] = useState(nome)
    const [age, setAge] = useState(idade)
    const [sexo, setSexo] = useState(sex)
    const [birthday, setBirthday] = useState(nascimento)
    const [cpf, setCpf] = useState(CPF)
    const [ra, setRa] = useState(RA)
    const [email, setEmail] = useState(mail)
    const [phone, setPhone] = useState(tel)
    const [adress, setAdress] = useState('')
    const [number, setNumber] = useState('')
    const {userData, setUserData, setPessoa, pessoa} = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(() => {
      if(customClass === 'column') setEdit(false)
    }, [edit, customClass])

    async function handleFileChange(e) {
      const file = e.target.files[0]

      if(file){
        const base64Img = await convertToBase64(file)
        setImg(base64Img)
      }
    }

    // Função para converter o arquivo de imagem em Base64
  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

    function editToggle() {
        setEdit(!edit)
    }

    function validateInputs(data) {
      if(data.adressComplet){
        if((!data.adressComplet.adress || data.adressComplet.adress === '') || 
            !data.adressComplet.number || data.adressComplet.number === '') {
            return 0
        }
      } 
      for(let key in data) {
        if(!data[key] || data[key] === '') return 0
      }
      return 1
    }

    async function submitHandle() {
      const birth = (days(birthday).format('DD-MM-YYYY'))
      
      const personal_data = {
        img,
        sexo,
        birth,
        cpf,
        ra,
        phone,
        adressComplet : {
          adress,
          number
        }
      }

      if (validateInputs(personal_data)) {
        try {
          console.log(userData.user_id)
          const personCreated = await api.post(
            `/${userData.user_id}/pessoa`,
            personal_data,
            {
              headers: { 'auth': `${userData.user_id}` },
            }
          ) 
          console.log(personCreated)
          const newPessoa = personCreated.data

          setUserData(prevStat => ({
            ...prevStat,
            isFirst: false,
          }))

          setPessoa(prevStat => ({
            ...prevStat,
            img: newPessoa.img,
            name: userData.name,
            age: newPessoa.age,
            sexo: newPessoa.sexo,
            birth: newPessoa.birth,
            cpf: newPessoa.cpf,
            ra: newPessoa.ra,
            email: userData.email,
            phone: newPessoa.phone,
            adressComplet: newPessoa.adressComplet
          }))

          onClose()
          navigate("/home")
        } catch (err) {
          console.log(err)
        }
      } else alert("Campos vázios! Preencha todas as informações");
    }

    async function editHandle(){
      const birth = days(birthday).format('DD-MM-YYYY')
      const personal_data = {
        img,
        name,
        sexo,
        birth,
        cpf,
        ra,
        email,
        phone
      }

      if(validateInputs(personal_data)){
        try{
          const pessoaUpdated = await api.patch(`/pessoa/${userData.user_id}`, {
            img,
            name,
            sexo,
            birth,
            cpf,
            ra,
            email,
            phone
          }, {headers: {'auth': `${userData.user_id}`}})
          
          if (!pessoaUpdated.data.pessoa) {
            console.error('Dados da pessoa não foram retornados:', pessoaUpdated);
            return;
          }

          const data = pessoaUpdated.data.pessoa
          setPessoa(prevStat => ({
            ...prevStat,
            img: data.img,
            name: data.name,
            age: data.age,
            sexo: data.sexo,
            birth: data.birth,
            cpf: data.cpf,
            ra: data.ra,
            email: data.email,
            phone: data.phone
          }))
          console.log(pessoa)
          editToggle()
        }catch(err){
          console.log(err)
        }
      } else alert('Campos vázio(s)!')

    }

    return (
      <div className={styles.containers + " " + styles.margin}>
        <div className={styles.header}>
          <h3>Dados pessoais</h3>
        </div>
        <div className={styles.infos + " " + styles[customClass]}>
          <div className={styles.divImg}>
            <label htmlFor="file-img">Foto</label>
            {customClass === "column" ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {img ? (
                  <img className={styles.imgEdit} src={img} alt="foto perfil" />
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
            ) : !img ? (
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
            ) : !edit ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <label className={styles.editButtonImg} htmlFor="file-img">
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
                  <span>Editar</span>
                </label>
                <img className={styles.img} src={img} alt="foto perfil" />
              </div>
            ) : (
              <img className={styles.imgEdit} src={img} alt="foto perfil" />
            )}
          </div>
          <div className={styles.item}>
            {customClass !== "column" && (
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
            )}
            {customClass !== "column" && (
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
            )}
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
              <label htmlFor="birthday">Data de nascimento</label>
              <input
                onChange={(e) => setBirthday(e.target.value)}
                value={birthday}
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
            {customClass !== "column" && (
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
            )}
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