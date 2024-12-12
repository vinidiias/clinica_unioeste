import styles from './LoginForm.module.css'
import Input from '../form/Input'
import Submit from '../form/Submit'

import { useState } from 'react'

const RegisterForm = ({ handleSubmit, handleClick }) => {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')


    const submit = (e) =>{
      e.preventDefault()

      if(password !== confirmPassword) {
        alert('Senhas não coincidem')
        return 
      }
      
      handleSubmit(email, name, password)
    }

    return (
      <form onSubmit={submit}>
        <Input
          type="email"
          name="email"
          text="Email"
          placeholder="Digite seu email"
          customClass="column padding_login"
          handleOnChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="name"
          name="name"
          text="Nome"
          placeholder="Digite seu nome"
          customClass="column padding_login"
          handleOnChange={(e) => setName(e.target.value)}
        />
        <Input
          type="password"
          name="password"
          text="Nova Senha"
          placeholder="Digite sua senha"
          customClass="column padding_login"
          handleOnChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="confirmPassword"
          name="password"
          text="Confirmar Senha"
          placeholder="Digite sua senha"
          customClass="column padding_login"
          handleOnChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div className={styles.form_submit}>
          <Submit text="Criar Conta" />
          <button className={styles.btn} onClick={handleClick}>
            Entrar
          </button>
        </div>
      </form>
    );
}

export default RegisterForm