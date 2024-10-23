import styles from './LoginForm.module.css'
import Input from '../form/Input'
import Submit from '../form/Submit'
import { useState } from 'react'


const RegisterForm = ({ handleSubmit, handleClick }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submit = (e) =>{
      e.preventDefault()
      console.log(email + ' ' + password)
      handleSubmit(email, password)
    }

    return (
      <form onSubmit={submit}>
        <Input
          type="text"
          name="name"
          text="Nome"
          placeholder="Digite seu nome"
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
          <Submit text="Criar Conta" />
          <button className={styles.btn} onClick={handleClick}>Entrar</button>
        </div>
      </form>
    );
}

export default RegisterForm