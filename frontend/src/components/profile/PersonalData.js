import { useState } from 'react';
import styles from './PersonalData.module.css'


const PersonalData =  ({ img, nome='', idade='', sex='M', nascimento='', CPF='', RA='', mail='', tel='' }) => {
    const [edit, setEdit] = useState(true)
    const [selectedFile, setSelectedFile] = useState('')
    const [name, setName] = useState(nome)
    const [age, setAge] = useState(idade)
    const [sexo, setSexo] = useState(sex)
    const [birth, setBirth] = useState(nascimento)
    const [cpf, setCpf] = useState(CPF)
    const [ra, setRa] = useState(RA)
    const [email, setEmail] = useState(mail)
    const [phone, setPhone] = useState(tel)

    function handleFileChange(e) {
      const file = e.target.files[0]

      if(file){
        setSelectedFile(URL.createObjectURL(file))
      }
    }

    function editToggle() {
        setEdit(!edit)
        console.log(edit)
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
      <div className={styles.containers}>
        <div className={styles.header}>
          <h3>Dados pessoais</h3>
        </div>
        <div className={styles.infos}>
          <div
            className={styles.input}
            style={{
              width: "auto",
              position: "relative",
              display: "inline-block",
            }}
          >
            <label htmlFor="name">Foto</label>
            {selectedFile && !edit ? (
              <>
                <button
                  style={{
                    position: "absolute",
                    top: "55px", // Ajuste conforme necessário
                    left: "30px", // Ajuste conforme necessário
                    zIndex: "1", // Garante que o botão fique acima da imagem
                  }}
                >
                  Editar
                </button>
                <img
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    position: "relative",
                    opacity: "0.7",
                  }}
                  src={selectedFile}
                  alt='foto perfil'
                />
              </>
            ) : selectedFile ? (
              <img
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                }}
                src={selectedFile}
                alt='foto perfil'
              />
            ) : (
              <input
                type="file"
                accept="image/png, image/jpeg"
                required
                onChange={handleFileChange}
              />
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
            <div className={styles.submitEdit}>
              <button onClick={editToggle}>Editar dados</button>
              {!edit && <button onClick={editHandle}>Confirmar</button>}
            </div>
          </div>
        </div>
      </div>
    );
}

export default PersonalData