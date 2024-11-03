import { useContext, useEffect, useState } from 'react';
import styles from './PersonalData.module.css'
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import api from '../../services/Api';


const PersonalData =  ({ customClass, onClose, imgProfile='', nome='', idade='', sex='M', nascimento='', CPF='', RA='', mail='', tel=''}) => {
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
    const [adress, setAdress] = useState('')
    const [number, setNumber] = useState('')
    const {userData, setUserData, setPessoa} = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(() => {
      if(customClass === 'column') setEdit(false)
    }, [edit, customClass])

    async function handleFileChange(e) {
      const file = e.target.files[0]

      if(file){
        const base64Img = await convertToBase64(file)
        setImg(base64Img)
        console.log(img)
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
        img,
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


      if (validateInputs(personal_data)) {
        try {
          const personCreated = await api.post(
            `/${userData.user_id}/pessoa`,
            {
              img,
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
            },
            {
              headers: { auth: `${userData.user_id}` },
            }
          )
 
          const pessoa = personCreated.data
          console.log(pessoa)

          setUserData((prevStat) => ({
            ...prevStat,
            isFirst: false,
          }))

          setPessoa({
            img: pessoa.img,
            name: pessoa.name,
            age: pessoa.age,
            sexo: pessoa.sexo,
            birth: pessoa.birth,
            cpf: pessoa.cpf,
            ra: pessoa.ra,
            email: pessoa.email,
            phone: pessoa.phone,
            adressComplet: pessoa.adressComplet
          })

          onClose()
          navigate("/home")
        } catch (err) {
          console.log(err)
        }
      } else alert("Campos vázios! Preencha todas as informações");
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
              <button className={styles.editButtonImg}>Editar</button>
              <img className={styles.img} src={img} alt="foto perfil" />
              </div>
            ) : (
              <img className={styles.imgEdit} src={img} alt="foto perfil" />
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