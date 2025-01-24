import styles from "./index.module.css";
import api from "../../../../services/Api";
import Input from "../../../form/Input";
import Select from "../../../form/Select";
import { convertToBase64 } from "../../../util/ConvertToBase64";
import { UserContext } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import Button from "../../../form/Button";
import ImageInput from "../../../form/ImageInput";
import ProfileSubmit from '../ProfileSubmit'

const PersonalData = ({
  handleEdit,
  imgProfile = "",
}) => {
  const [edit, setEdit] = useState(true);
  const [img, setImg] = useState(imgProfile);
  
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

  async function editHandle() {
    /*try {
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
    }*/
  }

  return (
    <div className={`${styles.containers}`}>
      <div className={styles.header}>
        <h3>Dados pessoais</h3>
      </div>
      <div className={styles.infos}>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'auto'}}>
          <PersonalData.Imagem
            img={img}
            handleFileChange={handleFileChange}
            edit={edit}
          />
        </div>
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
      </div>
      <ProfileSubmit txtEdit="Editar Dados" txtSubmit="Confirmar" handleToggle={editToggle} editState={edit} />
    </div>
  );
};

PersonalData.Imagem = function ({ img, handleFileChange, edit }) {
  return (
    <div className={styles.divImg}>
      <label htmlFor="file-img">Foto *</label>
      {!img ? (
        <ImageInput 
          text='Selecionar'
          name='file-img'
          handleFileChange={handleFileChange}
        />
      ) : !edit ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ImageInput 
            text='Editar'
            customClass="edit"
            name="file-img"
            handleFileChange={handleFileChange}
          />
          <img
            id="mg"
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
