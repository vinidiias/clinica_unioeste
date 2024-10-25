import { useState } from 'react';
import styles from './PersonalData.module.css'


const PersonalData =  ({ img, name, age, birth, cpf, ra, email, phone, editHandle }) => {
    const [edit, setEdit] = useState(true)
    const [formData, setFormData] = useState({
        img,
        name,
        age,
        birth,
        cpf,
        ra,
        email,
        phone
    })
    
    function editToggle() {
        setEdit(!edit)
        console.log(edit)
    }

    return (
      <div className={styles.containers}>
        <div className={styles.header}>
          <h3>Dados pessoais</h3>
        </div>
        <div className={styles.infos}>
          <div className={styles.input} style={{width: 'auto'}}>
            <label htmlFor="img_profile">Foto</label>
            <img
              style={{ width: "100px", height: "100px", borderRadius: "50%" }}
              src={img}
              alt=""
            />
          </div>
          <div className={styles.item}>
            <div className={styles.input}>
              <label htmlFor="name">Nome</label>
              <input
                disabled={edit}
                type="text"
                name="name"
                id="name"
                autoComplete="username"
                value={name}
              />
            </div>
            <div className={styles.input}>
              <label htmlFor="age">Idade</label>
              <input
                disabled={edit} type="text" name="age" id="age" value={age} />
            </div>
            <div className={styles.input}>
              <label htmlFor="sexuality">Sexo</label>
              <select disabled={edit} name="sexuality" id="sexuality">
                <option value="M">Masculino</option>
                <option value="F">Feminino</option>
              </select>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.input}>
              <label htmlFor="birth">Data de nascimento</label>
              <input
                disabled={edit} type="date" name="birth" id="birth" value={birth} />
            </div>
            <div className={styles.input}>
              <label htmlFor="cpf">Data de nascimento</label>
              <input
                disabled={edit} type="text" name="cpf" id="cpf" value={cpf} />
            </div>
            <div className={styles.input}>
              <label htmlFor="ra">RA</label>
              <input
                disabled={edit} type="text" name="ra" id="ra" value={ra} />
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.input}>
              <label htmlFor="phone">Telefone</label>
              <input
                disabled={edit} type="text" name="phone" id="phone" value={phone} autoComplete='home tel' />
            </div>
            <div className={styles.input}>
              <label htmlFor="email">Email</label>
              <input
                disabled={edit}
                type="email"
                name="email"
                id="email"
                autoComplete="home email"
                value={email}
              />
            </div>
            <div className={styles.submitEdit}>
              <button onClick={editToggle}>Editar dados</button>
              {!edit && (
                <button>Confirmar</button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
}

export default PersonalData