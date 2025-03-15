/*import styles from './Auth.module.css'
import FirstAcessRegister from './FirstAcessRegister'

import { useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { UserContext } from '../context/UserContext'
import Loading from '../layout/Loading'
import UserLogin from './UserLogin'
import api from '../../services/Api'

const Auth = ({ registerPsychologist, registerAdmin }) => {
  const { setUserData } = useContext(UserContext)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [showRegisterPsy, setShowRegisterPsy] = useState(registerPsychologist)
  const [showRegisterAdmin, setShowRegisterAdmin] = useState(registerAdmin)
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

  async function registerAdminHandler(email, name, password, id) {
    try{
      setLoading(true)
      const userCreated = await api.post("/admin/register", {
        email,
        name,
        password,
        id,
      })
        const data = userCreated.data.administrador

        if(!userCreated) return alert('Erro ao criar conta. Tente novamente...')

        console.log(data)
        
        setUserData({
          email: data.email,
          name: data.user,
          role: data.role,
          user_id: data._id
        })

        setShowRegisterAdmin(false)
      } 
    catch(err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
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
            ...prevState,
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

  const style = {
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2.5em',
      backgroundColor: '#483768',
      borderRadius: '10px',
      fontSize: '.9em',
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
            initial="initial"
            animate="animate"
            exit="exit"
            className={styles.login}
          >
            <h1>Ativar Conta de Psicóloga</h1>
            <UserLogin
              register={showRegisterPsy}
              handleRegister={registerPsyHandler}
            />
          </motion.div>
        ) : showRegisterAdmin ? (
          <motion.div
            key="registerAdmin"
            initial="initial"
            animate="animate"
            exit="exit"
            className={styles.login}
          >
            <h1>Ativar Conta de Administrador</h1>
            <UserLogin
              register={showRegisterAdmin}
              handleRegister={registerAdminHandler}
            />
          </motion.div>
        ) : (
          <UserLogin style={style} />
        )}
      </>
    );
}

export default Auth*/