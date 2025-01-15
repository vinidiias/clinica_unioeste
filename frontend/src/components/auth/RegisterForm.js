import AuthForm from './AuthForm'

const UserRegister = ({ handleClick }) => {

    const submit = (e) =>{
      e.preventDefault()

      console.log('submit')
      }

    const fields = [
      { name: 'email', label: 'Email', type: 'email', placeholder: 'Digite seu email' },
      { name: 'name', label: 'Nome', type: 'name', placeholder: 'Digite seu nome' },
      { name: 'password', label: 'Senha', type: 'password', placeholder: 'Digite sua senha' },
      { name: 'confirm-password', label: 'Confirmar Senha', type: 'password', placeholder: 'Digite sua senha' },
  ]

  const btns = [
      { label: 'Criar conta', type: 'submit' },
      { label:'Entrar', type: 'button', handleClick: handleClick }
  ]

  return (
    <>
      <h1>Criar</h1>
      <AuthForm fields={fields} btns={btns} />
    </>
    );
}

export default UserRegister