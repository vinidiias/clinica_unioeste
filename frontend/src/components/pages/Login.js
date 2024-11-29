import styles from './Login.module.css'
import PersonalDataScreenOverlay from '../profile/PersonalDataScreenOverlay'

import { useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { UserContext } from '../context/UserContext'
import Loading from '../layout/Loading'
import RegisterForm from '../login/RegisterForm'
import LoginForm from '../login/LoginForm'
import api from '../../services/Api'

const Login = ({ registerPsychologist }) => {
  const { setUserData } = useContext(UserContext)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [showRegisterPsy, setShowRegisterPsy] = useState(registerPsychologist)
  const [isOverlayVisible, setOverlayVisible] = useState(false)

  useEffect(() => {
    setUserData({})
  },[setUserData])

  const toggleOverlay = () => {
    setOverlayVisible(!isOverlayVisible)
  }

  const toggleChange = () => {
    setShowLogin(!showLogin)
  }

  async function registerHandler(email, name, password) {
    try{
      setLoading(true)
      const userCreated = await api.post('/user', {
        email,
        name,
        password,
        role: 'paciente'
      })

      if(!userCreated) return alert('Erro ao criar conta. Tente novamente...')

      const user = userCreated.data
      console.log(`dados do usuario criado: ${user}`)

      //depois de validado então envia informações para o Context (session da aplicação)
      setUserData({
        email: user.email,
        name: user.name,
        user_id: user._id,
      })

      setShowLogin(!showLogin)
      setLoading(false)
    } catch(err){
      console.log(err)
    }
  }

  async function loginHandler(email, password) {
    try{
      setLoading(true)
      const userCreated = await api.post('/session', {
        email,
        password
      })
        const data = userCreated.data

        console.log(data)
        
        setUserData(prevState => ({
          ...prevState,
          email: data.email,
          name: data.user,
          role: data.role,
          isFirst: true,
          user_id: data.user_id
        }))

        if (data.firstLogin) {
          setOverlayVisible(true);
        } else {
          setUserData(prevState => ({
            isLogged: true,
          }))
          navigate("/home");
        }
      } 
    catch(err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  async function registerPsyHandler(email, name, password, id) {
    try{
      setLoading(true)
      const userCreated = await api.post("/psicologo/register", {
        email,
        name,
        password,
        id,
      })
        const data = userCreated.data.psicologa

        if(!userCreated) return alert('Erro ao criar conta. Tente novamente...')

        console.log(data)
        
        setUserData({
          email: data.email,
          name: data.user,
          role: data.role,
          user_id: data._id
        })

        setShowRegisterPsy(false)
      } 
    catch(err) {
      console.log(err)
    } finally {
      setLoading(false)
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
          <PersonalDataScreenOverlay
            customClass="column"
            onClose={toggleOverlay}
          />
        )}
        {loading ? (
          <Loading />
        ) : showLogin ? (
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
        ) : showRegisterPsy ? (
          <motion.div
            key="registerPsychologist"
            variants={cardVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={styles.login}
          >
            <h1>Ativar Conta</h1>
            <LoginForm registerPsychologist={showRegisterPsy} handleRegisterPsy={registerPsyHandler} />
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
            <LoginForm handleSubmit={loginHandler} handleClick={toggleChange} />
          </motion.div>
        )}
      </>
    );
}

export default Login