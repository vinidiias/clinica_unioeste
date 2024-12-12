import styles from './InvitePsychologist.module.css'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Input from '../form/Input'
import Submit from '../form/Submit'
import api from '../../services/Api'

const InvitePsychologist = ({ inviteAdmin }) => {
    const [email, setEmail] = useState('')
    const role = inviteAdmin ? 'admin' : 'psicologo'

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

    const handleInvite = async (e) => {
        e.preventDefault()

        if(!email || email === '') return alert('Email inválido')

        try{
          const emailSent = await api.post(`/${role}/convite`, {email, role})

          if(emailSent) {
            console.log(emailSent.data)
            alert(`Convite para ${inviteAdmin ? "o administrador" : "a psicóloga"} enviado com sucesso!`)
          }
          console.log(emailSent)
        }catch(err) {
          console.log(err)
        }

    }

    return (
      <>
        <div className={styles.login_container}>
          <motion.div
            key="signup"
            variants={cardVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={styles.login}
          >
            <h1>Convidar {inviteAdmin ? 'Administrador' : 'Psicólogo'}</h1>
            <form onSubmit={handleInvite}>
              <Input
                type="email"
                text={`Email ${inviteAdmin ? "do Administrador" : "da Psicóloga"}`}
                name="email_psicologa"
                placeholder="Digite o email"
                customClass="column align"
                handleOnChange={(e) => setEmail(e.target.value)}
              />
              <Submit text="Enviar convite" />
            </form>
          </motion.div>
        </div>
      </>
    );
}

export default InvitePsychologist