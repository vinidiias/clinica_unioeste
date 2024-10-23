import styles from './LoginForm.module.css'
import Input from '../form/Input'
import Submit from '../form/Submit'
import { style } from 'framer-motion/client'

const LoginForm = ({ handleSubmit, handleClick }) => {

    const submit = (e) =>{
      e.preventDefault()

      handleSubmit()
    }

    return (
      <form onSubmit={submit}>
        <Input
          type="text"
          name="name"
          text="Nome"
          placeholder="Digite seu nome"
          customClass="column padding_login"
        />
        <Input
          type="password"
          name="password"
          text="Senha"
          placeholder="Digite sua senha"
          customClass="column padding_login"
        />
        <div className={styles.form_submit}>
          <Submit text="Entrar" />
          <button className={styles.btn} onClick={handleClick}>Criar conta</button>
        </div>
      </form>
    );
}

export default LoginForm