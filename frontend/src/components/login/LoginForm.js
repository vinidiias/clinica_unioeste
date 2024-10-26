import styles from './LoginForm.module.css'
import Input from '../form/Input'
import Submit from '../form/Submit'

import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'

const LoginForm = ({ handleSubmit, handleClick }) => {
  const {userData, setUserData} = useContext(UserContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (userData.email) {
      setEmail(userData.email);
    }
  }, [userData.email]);

  const submit = (e) =>{
    e.preventDefault()

    handleSubmit(email, password)
  }

  return (
    <form onSubmit={submit}>
      <Input
        type="email"
        name="name"
        text="Email"
        value={email}
        placeholder="Digite seu email"
        customClass="column padding_login"
        handleOnChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        name="password"
        text="Senha"
        placeholder="Digite sua senha"
        customClass="column padding_login"
        handleOnChange={(e) => setPassword(e.target.value)}
      />
      <div className={styles.form_submit}>
        <Submit text="Entrar" />
        <button className={styles.btn} onClick={handleClick}>Criar conta</button>
      </div>
    </form>
  );
}

export default LoginForm