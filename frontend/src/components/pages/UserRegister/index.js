import withStyleAuth from "../../../hocs/withStyleAuth";
import AuthForm from "../../auth/AuthForm"
import { useNavigate } from "react-router-dom";

const UserRegister = ({ handleClick, styleTitle }) => {

    const navigate = useNavigate()
    
    const handleNavigate = () => navigate("/login");

    const fields = [
        { name: 'email', label: 'Email', type: 'email', placeholder: 'Digite seu email' },
        { name: 'name', label: 'Nome', type: 'name', placeholder: 'Digite seu nome' },
        { name: 'password', label: 'Senha', type: 'password', placeholder: 'Digite sua senha' },
        { name: 'confirm-password', label: 'Confirmar Senha', type: 'password', placeholder: 'Digite sua senha' },
    ]
  
    const btns = [
        { label: 'Criar conta', type: 'submit' },
        { label:'Entrar', type: 'button', handleClick: handleNavigate }
    ]

    return (
      <>
        <AuthForm title='Criar' fields={fields} btns={btns} />
      </>
    );
}

export default withStyleAuth(UserRegister)