import withStyleAuth from "../../../hocs/withStyleAuth";
import AuthForm from "../../auth/AuthForm"
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm, useFormContext } from "react-hook-form";

const UserLogin = () => {

    const navigate = useNavigate()

    const handleNavigate = () => navigate('/register')

    const formMethods = useForm()

    const handleLogin = (data) => {
      console.log(data.email)
    }

    const fields = [
        { name: 'email', label: 'Email', type: 'email', placeholder: 'Digite seu email' },
        { name: 'password', label: 'Senha', type: 'password', placeholder: 'Digite sua senha' },
    ]

    const btns = [
        { label: 'Entrar', type: 'submit' },
        { label:'Criar conta', type: 'button', handleClick: handleNavigate }
    ]


    return (
      <>
        <FormProvider {...formMethods}>
          <form onSubmit={formMethods.handleSubmit(handleLogin)}>
            <AuthForm title="Entrar" fields={fields} btns={btns} />
          </form>
        </FormProvider>
      </>
    );
}

export default withStyleAuth(UserLogin)