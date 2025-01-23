import styles from "./index.module.css";
import api from "../../../../services/Api";
import { convertToBase64 } from "../../../util/ConvertToBase64";
import { UserContext } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

const PersonalData = ({
  onClose,
  imgProfile = "",
  nome = "",
  idade = "",
  sex = "M",
  nascimento = "",
  CPF = "",
  RA = "",
  mail = "",
  tel = "",
}) => {
  const [edit, setEdit] = useState(true);
  const [img, setImg] = useState(imgProfile);
  const [name, setName] = useState(nome);
  const [password, setPassword] = useState("");
  const [sexo, setSexo] = useState(sex);
  const [birth, setBirth] = useState(nascimento);
  const [cpf, setCpf] = useState(CPF);
  const [ra, setRa] = useState(RA);
  const [email, setEmail] = useState(mail);
  const [phone, setPhone] = useState(tel);
  const [adress, setAdress] = useState("");
  const [number, setNumber] = useState("");
  const { userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  async function handleFileChange(e) {
    const file = e.target.files[0];

    if (file) {
      const base64Img = await convertToBase64(file);
      setImg(base64Img);
    }
  }

const editToggle = () => {
    setEdit(!edit);
  }

  async function submitHandle() {
    const personal_data = {
      img,
      sexo,
      birth,
      cpf,
      ra,
      phone,
      adressComplet: {
        adress,
        number,
      },
    };

    try {
      const personCreated = await api.post(
        `/${userData.user_id}/pessoa`,
        personal_data,
        {
          headers: { auth: `${userData.user_id}` },
        }
      );
      const newPessoa = personCreated.data.pessoa;
      console.log(newPessoa);

      let user = JSON.parse(sessionStorage.getItem("user"));
      user.isFirst = false;
      sessionStorage.setItem("user", JSON.stringify(user));

      setUserData((prevState) => ({
        ...prevState,
        isLogged: true,
      }));

      onClose();
      navigate("/home");
    } catch (err) {
      console.log(err);
    }
  }

  async function editHandle() {
    const user = {
      name,
      email,
      password,
    };

    const personal_data = {
      img,
      sexo,
      birth,
      cpf,
      ra,
      phone,
    };

    try {
      const pessoaUpdated = await api.patch(
        `/pessoa/${userData.user_id}`,
        personal_data,
        { headers: { auth: `${userData.user_id}` } }
      );

      if (!pessoaUpdated.data.pessoa) {
        console.error("Dados da pessoa não foram retornados:", pessoaUpdated);
        return;
      }

      try {
        const userUpdated = await api.patch(
          `/user/${userData.user_id}`,
          user,
          { headers: { auth: `${userData.user_id}` } }
        );

        if (userUpdated) {
          let user = JSON.parse(sessionStorage.getItem("user"));

          if (user) {
            user.name = userUpdated.data.user.name;
            user.email = userUpdated.data.user.email;
            sessionStorage.setItem("user", JSON.stringify(user));
          } else {
            console.error("Nenhum usuario encontrado");
          }
        }
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    } finally {
      editToggle();
    }
  }

  return (
    <div className={styles.containers + " " + styles.margin}>
      <div className={styles.header}>
        <h3>Dados pessoais</h3>
      </div>
      <div className={styles.infos}>
        <PersonalData.Imagem
          img={img}
          handleFileChange={handleFileChange}
          edit={edit}
        />
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
              value={idade}
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
          <div className={styles.input}>
            <label htmlFor="password">Alterar senha</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              disabled={edit}
              type="password"
              name="password"
              id="password"
              autoComplete="new-password"
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
};

PersonalData.Imagem = function ({ customClass, img, handleFileChange, edit }) {
  return (
    <div className={styles.divImg}>
      <label htmlFor="file-img">Foto</label>
      {!img ? (
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
          <img
            id="file-img"
            className={styles.img}
            src={img}
            alt="foto perfil"
          />
        </div>
      ) : (
        <img className={styles.imgEdit} src={img} alt="foto perfil" />
      )}
    </div>
  );
};

export default PersonalData;
