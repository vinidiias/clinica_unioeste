import withStyleAuth from "../../../hocs/withStyleAuth";
import AuthForm from "../../auth/AuthForm"
import api from "../../../services/Api";
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import withAuth from "../../../hocs/withAuth";

const UserRegister = ({ onAction }) => {

    const { setUserData } = useContext(UserContext)

    const navigate = useNavigate()

    const formMethods = useForm()
    
    const handleNavigate = () => navigate("/login");

    const handleRegisterUser = async (data) => {
      if(data.password !== data.confirmPassword) {
        alert("Senhas não correspondem!")
      }
      delete data.confirmPassword
      try{
        const userCreated = await api.post('/user', {...data, role: 'paciente'})
  
        if(!userCreated) return alert('Erro ao criar conta. Tente novamente...')
  
        const user = userCreated.data
        console.log(`dados do usuario criado: ${user}`)
  
        //depois de validado então envia informações para o Context (session da aplicação)
        setUserData({
          email: user.email,
          name: user.name,
          user_id: user._id,
        })
  
        navigate('/login')
      } catch(err){
        console.log(err)
      }
    }

    const fields = [
      {
        name: "name",
        label: "Nome",
        type: "text",
        placeholder: "Digite seu nome",
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "Digite seu email",
      },
      {
        name: "password",
        label: "Senha",
        type: "password",
        placeholder: "Digite sua senha",
      },
      {
        name: "confirmPassword",
        label: "Confirmar Senha",
        type: "password",
        placeholder: "Digite sua senha",
      },
    ];
  
    const btns = [
        { label: 'Criar conta', type: 'submit' },
        { label:'Entrar', type: 'button', handleClick: handleNavigate }
    ]

    return (
      <>
        <FormProvider {...formMethods}>
          <form
            onSubmit={formMethods.handleSubmit(handleRegisterUser)}
          >
            <AuthForm title="Criar" fields={fields} btns={btns} />
          </form>
        </FormProvider>
      </>
    );
}

export default withStyleAuth(UserRegister)