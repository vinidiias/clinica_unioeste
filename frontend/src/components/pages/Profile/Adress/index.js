import styles from "../PersonalData/index.module.css";
import Input from "../../../form/Input";
import Select from "../../../form/Select";
import api from "../../../../services/Api";
import { UserContext } from "../../../context/UserContext";
import { useContext, useState } from "react";
import Button from "../../../form/Button";
import ProfileSubmit from "../ProfileSubmit";
import { FormProvider, useForm } from "react-hook-form";

const Adress = () => {
  const [edit, setEdit] = useState(true);
  const formMethods = useForm()

  const fields = [
    {
      field: (
        <Input
          name={"addressComplete.address"}
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

  async function handleEdit(data) {
    console.log(data)
      /*const adressComplet = {
        adress,
        number
    }
      console.log(adressComplet)
       if(!validation(adressComplet)) {
            console.log('Dados de endereço incompleto(s)! Preencha todos os campos.')
            return
       }
       try{
          const adressUpdated = await api.patch(`/pessoa/${userData.user_id}`, {adressComplet}, {
            headers: {'auth': `${userData.user_id}`}
          })

          if (!adressUpdated.data.pessoa) {
            console.error('Dados da pessoa não foram retornados:', adressUpdated);
            return;
          }
          
          const data = adressUpdated.data.pessoa

           setPessoa(prevStat => ({
            ...prevStat,
            adressComplet: data.adressComplet
           }))

           console.log(pessoa)
           editToggle()
       } catch(err){
        console.log(err)
       }*/
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
