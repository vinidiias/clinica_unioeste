import styles from "./index.module.css";
import api from "../../../../services/Api";
import Input from "../../../form/Input";
import Select from "../../../form/Select";
import { convertToBase64 } from "../../../util/ConvertToBase64";
import { UserContext } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import Button from "../../../form/Button";

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

  const fields = [
    {
      field: [
        <Input name={"name"} text={"Nome"} type={"text"} disabled={edit} />,
        <Input name={"age"} text={"Idade"} type={"text"} disabled={true} />,
        <Select
          name={"sexo"}
          text={"Sexo"}
          options={["Masculino", "Feminino"]}
          disabled={edit}
        />,
      ],
    },
    {
      field: [
        <Input
          name={"birth"}
          text={"Data de Nascimento"}
          type={"date"}
          disabled={edit}
        />,
        <Input name={"cpf"} text={"CPF"} type={"text"} disabled={edit} />,
        <Input name={"ra"} text={"RA"} type={"text"} disabled={edit} />,
      ],
    },
    {
      field: [
        <Input
          name={"phone"}
          text={"Telefone"}
          type={"text"}
          disabled={edit}
        />,
        <Input name={"email"} text={"Email"} type={"email"} disabled={edit} />,
        <Input
          name={"password"}
          text={"Alterar Senha"}
          type={"password"}
          disabled={edit}
        />,
      ],
    },
  ];

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
    <div className={`${styles.containers} ${styles.margin}`}>
      <div className={styles.header}>
        <h3>Dados pessoais</h3>
      </div>
      <div className={styles.infos}>
        <PersonalData.Imagem
          img={img}
          handleFileChange={handleFileChange}
          edit={edit}
        />
      {fields.map((field, index) => {
        return (
          <div className={styles.item} key={index}>
            {field.field.map((subField, subIndex) => {
              return (
              <React.Fragment key={subIndex}>
              {subField}
              </React.Fragment>
              )
            })}
          </div>
        )
      })}
        <div className={styles.submitEdit}>
            <Button type={'button'} text='Editar Dados' handleClick={editToggle} />
            {!edit && <Button text='Confirmar' handleClick={editHandle} />}
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
