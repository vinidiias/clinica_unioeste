import styles from "../PersonalData/index.module.css";
import Input from "../../../form/Input";
import Select from "../../../form/Select";
import api from "../../../../services/Api";
import { UserContext } from "../../../context/UserContext";
import { useContext, useState } from "react";
import Button from "../../../form/Button";
import ProfileSubmit from "../ProfileSubmit";
import { FormProvider, useForm } from "react-hook-form";

const Adress = ({ data }) => {
  console.log(data)
  const [edit, setEdit] = useState(true);
  const formMethods = useForm({ defaultValues: {addressComplet: data} })
  const { userData } = useContext(UserContext)

  const fields = [
    {
      field: (
        <Input
          name={"addressComplet.address"}
          text={"Endereço"}
          type={"text"}
          disabled={edit}
        />
      ),
    },
    {
      field: (
        <Input
          name={"addressComplet.number"}
          text={"Número"}
          type={"text"}
          disabled={edit}
        />
      ),
    },
  ];

  function editToggle() {
    setEdit(!edit);
  }

  async function handleEdit(dataAddress) {
    console.log(data)
       try{
          await api.patch(`/pessoa/${userData.user_id}`, dataAddress, {
            headers: {auth: `${userData.user_id}`}
          })
          .then(resp => {
            console.log(resp)
            editToggle()
          })
          .catch(err => console.error(err))

       } catch(err){
        console.log(err)
       }
    }

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(handleEdit)}>
        <div className={styles.containers}>
          <div className={styles.header}>
            <h3>Endereço</h3>
          </div>
          <div className={styles.infos}>
            {fields.map((field, index) => {
              return (
                <div className={styles.item} key={index}>
                  {field.field}
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

export default Adress;
