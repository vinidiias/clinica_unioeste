import FichaForm from './FichaForm'
import styles from './ViewFicha.module.css'
import fieldsFicha from './fields_ficha_config'
import api from '../../services/Api'
import { useNavigate } from "react-router-dom"
import { useContext, useEffect } from "react"
import { FormProvider, useForm } from 'react-hook-form'
import { UserContext } from '../context/UserContext'

const CreateFicha = () => {
  const { userData } = useContext(UserContext)
  const navigate = useNavigate()
  const formMethods = useForm({
    shouldUnregister: true
  })

  useEffect(() => {
    if (!userData.isLogged) {
      navigate("/");
    }
  }, [userData, navigate]);

  const handleCreateFicha = async (data) => {
    const filteredData = Object.fromEntries(
      Object.entries(data.preferred_day).filter(([_, value]) => value)
    );

    data.preferred_day = filteredData

    console.log(data)
    try {
      const fichaCreated = await api.post(
        `${userData.user_id}/ficha`,
        data,
        { headers: { auth: `${userData.user_id}` } }
      );

      if (fichaCreated) {
        console.log(fichaCreated);
        alert("Ficha criada com sucesso, espere ser atendido.");
        navigate("/home");
      }
    } catch (err) {
      console.log(err);
    }
  }

  

  const buttonsFicha = [
    { label: 'Enviar', type: 'submit', customClass: 'align' },
  ]
  

  return (
      <FormProvider {...formMethods}>
          <form className={styles.ficha_form} onSubmit={formMethods.handleSubmit(handleCreateFicha)}>
            <FichaForm fieldsContainers={fieldsFicha} buttons={buttonsFicha} title="Preencha o fichário" />
          </form>
      </FormProvider>
  );
}

export default CreateFicha