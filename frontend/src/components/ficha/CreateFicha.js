import FichaForm from './FichaForm'
import styles from './ViewFicha.module.css'
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { FormProvider, useForm } from 'react-hook-form'
import fieldsFicha from './fields_ficha_config'

const CreateFicha = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const navigate = useNavigate();
  const formMethods = useForm()

  useEffect(() => {
    if (!user.isLogged) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleCreateFicha = (data) => {
    console.log(data)
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