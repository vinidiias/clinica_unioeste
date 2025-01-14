import FichaForm from "../ficha/FichaForm"
import styles from './ViewFicha.module.css'
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { FormProvider, useForm } from 'react-hook-form'

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

  return (
      <FormProvider {...formMethods}>
          <form className={styles.ficha_form} onSubmit={formMethods.handleSubmit(handleCreateFicha)}>
            <FichaForm />
          </form>
      </FormProvider>
  );
}

export default CreateFicha