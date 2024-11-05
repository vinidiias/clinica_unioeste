import styles from './Login.module.css'

import { useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { UserContext } from '../context/UserContext'
import RegisterForm from '../login/RegisterForm'
import LoginForm from '../login/LoginForm'
import api from '../../services/Api'
import PersonalDataScreenOverlay from '../profile/PersonalDataScreenOverlay'



const Login = () => {
  const {userData, setUserData} = useContext(UserContext)
  const [showLogin, setShowLogin] = useState(false)
  const [isOverlayVisible, setOverlayVisible] = useState(false)
  const navigate = useNavigate()

  const toggleOverlay = () => {
    setOverlayVisible(!isOverlayVisible)
  }

  const toggleChange = () => {
    setShowLogin(!showLogin)
  }

  async function registerHandler(email, name, password) {
    try{
      const userCreated = await api.post('/user', {
        email,
        name,
        password
      })

      if(!userCreated) return alert('Erro ao criar conta. Tente novamente...')

      const user = userCreated.data

      //depois de validado então envia informações para o Context (session da aplicação)
      setUserData(prevStat => ({
        ...prevStat,
        email: user.email,
        name: user.name,
        user_id: user._id,
      }))

      setShowLogin(!showLogin)
    } catch(err){
      console.log(err)
    }
  }

  async function loginHandler(email, password) {
    try{
      const userCreated = await api.post('/session', {
        email,
        password
      })
      console.log(userCreated.data)
        const data = userCreated.data
          
        setUserData(prevStat => ({
          ...prevStat,
          isLogged: true,
          email: data.email,
          name: data.user,
          user_id: data.user_id,
        }))

        console.log(userData)
        if(data.firstLogin) {
          setOverlayVisible(true)
        }
        else navigate('/home')
      } 
    catch(err) {
      console.log(err)
    }
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
        {isOverlayVisible && (
          <PersonalDataScreenOverlay customClass="column" onClose={toggleOverlay} />
        )}
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
              handleSubmit={loginHandler}
              handleClick={toggleChange}
            />
          </motion.div>
        )}
      </>
    );
}

export default Login