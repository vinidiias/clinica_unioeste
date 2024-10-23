import styles from './Login.module.css'

import LoginForm from '../login/LoginForm'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import RegisterForm from '../login/RegisterForm'

import { motion } from 'framer-motion'
import api from '../../services/Api'

const Login = () => {
  const [showLogin, setShowLogin] = useState(false)
  const navigate = useNavigate()

  const toggleChange = () => {
    setShowLogin(!showLogin)
  }

  async function registerHandler(name, password) {
    try{
      const user = await api.post('/user', {
        name,
        password
      })
      console.log(user)
    } catch(err){
      console.log(err)
    }
  }

  const submitHandler = () => {
    navigate('/home')
  }

  const cardVariants = {
    initial: { scale: 0.96, y: 30, opacity: 0 },
    animate: { scale: 1, y: 0, opacity: 1, transition: { duration: 1, ease: [0.48, 0.15, 0.25, 0.96] } },
    exit: {
      scale: 0.6,
      y: 100,
      opacity: 0,
      transition: { duration: 0.2, ease: [0.48, 0.15, 0.25, 0.96] },
    },
  }

    return (
      <>
        {showLogin ? (
          <motion.div
          key="signup"
          variants={cardVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className={styles.login}
          >
            <h1> Criar conta</h1>
            <RegisterForm
              handleSubmit={registerHandler}
              handleClick={toggleChange}
            />
          </motion.div>
        ) : (
          <motion.div
          key="login"
          variants={cardVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className={styles.login}
          >
            <h1>Entrar</h1>
            <LoginForm
              handleSubmit={submitHandler}
              handleClick={toggleChange}
            />
          </motion.div>
        )}
      </>
    );
}

export default Login