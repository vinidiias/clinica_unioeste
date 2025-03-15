import styles from "./index.module.css";
import Input from "../../../form/Input";
import Select from "../../../form/Select";
import { convertToBase64 } from "../../../util/ConvertToBase64";
import React, { useContext, useState } from "react";
import ImageInput from "../../../form/ImageInput";
import ProfileSubmit from "../ProfileSubmit";
import { FormProvider, useForm } from "react-hook-form";
import { UserContext } from "../../../context/UserContext";
import api from "../../../../services/Api";

const PersonalData = ({ initialData }) => {
  const [edit, setEdit] = useState(true);
  const [img, setImg] = useState(initialData.img);
  const [originalData, setOriginalData] = useState(initialData);
  const { userData, setUserData } = useContext(UserContext);

  const formMethods = useForm({
    defaultValues: initialData || {},
  });

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
          autoComplete={"off"}
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
  };

  const comparasionChange = (sourceData, originalData) => {
    const updatedFields = Object.keys(sourceData).reduce((acc, key) => {
      if (sourceData[key] !== originalData[key]) {
        acc[key] = sourceData[key];
      }
      return acc;
    }, {});

    return updatedFields;
  };

  const separeDataPersonalandUser = (dataModified) => {
    const dataUser = {};
    const dataPerson = { ...dataModified };

    if (dataModified.name) {
      dataUser.name = dataModified.name;
      delete dataPerson.name;
    }

    if (dataModified.email) {
      dataUser.email = dataModified.email;
      delete dataPerson.email;
    }

    if (dataModified.password) {
      dataUser.password = dataModified.password;
      delete dataPerson.password;
    }

    return { dataUser, dataPerson };
  };

  async function editHandle(data) {
    const dataModified = comparasionChange(data, originalData);
    if (Object.keys(dataModified).length === 0) {
      alert('Sem alterações nos dados')
      return;
    } else {
      const dataSeparated = separeDataPersonalandUser(dataModified);
      const dataUser = dataSeparated.dataUser;
      const personData = dataSeparated.dataPerson;

      if (Object.keys(personData).length > 0 && personData !== null) {
        try {
          await api
            .patch(`/pessoa/${userData.user_id}`, personData, {
              headers: { auth: `${userData.user_id}` },
            })
            .then((resp) => console.log(resp))
            .catch((error) => console.error(error));
        } catch (err) {
          console.log(err);
        } finally {
          editToggle();
        }
      }
      if(Object.keys(dataUser).length > 0 && dataUser !== null) {
          try {
            await api
              .patch(`/user/${userData.user_id}`, dataUser, {
                headers: { auth: `${userData.user_id}` },
              })
              .then(() => {
                setUserData((prevStat) => ({
                  ...prevStat,
                  name: dataUser?.name ?? prevStat.name,
                  email: dataUser?.email ?? prevStat.email,
                }));
              })
              .catch((error) => console.error(error));
          } catch (err) {
            console.log(err);
          }
      } else {
        alert('Dados do usuário inválidos')
      }
    }
  }

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(editHandle)}>
        <div className={`${styles.containers}`}>
          <div className={styles.header}>
            <h3>Dados pessoais</h3>
          </div>
          <div className={styles.infos}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "auto",
              }}
            >
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
                      <React.Fragment key={subIndex}>{subField}</React.Fragment>
                    );
                  })}
                </div>
              );
            })}
          </div>
          <ProfileSubmit
            txtEdit="Editar Dados"
            txtSubmit="Confirmar"
            handleToggle={editToggle}
            editState={edit}
          />
        </div>
      </form>
    </FormProvider>
  );
};

PersonalData.Imagem = function ({ img, handleFileChange, edit }) {
  return (
    <div className={styles.divImg}>
      <label htmlFor="file-img">Foto *</label>
      {!img ? (
        <ImageInput
          text="Selecionar"
          name="file-img"
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
            text="Editar"
            customClass="edit"
            name="file-img"
            handleFileChange={handleFileChange}
          />
          <img id="mg" className={styles.img} src={img} alt="foto perfil" />
        </div>
      ) : (
        <img className={styles.imgEdit} src={img} alt="foto perfil" />
      )}
    </div>
  );
};

export default PersonalData;
