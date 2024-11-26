import { useEffect, useState } from 'react'
import Input from '../form/Input'
import styles from './InvitePsychologist.module.css'
import { motion } from 'framer-motion'
import Submit from '../form/Submit'

const InvitePsychologist = () => {
    const [email, setEmail] = useState('')

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

        console.log(email)

        alert('Convite enviado com sucesso!')
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
            <h1>Convidar psicologo</h1>
            <form onSubmit={handleInvite}>
              <Input
                type="email"
                text="Email da psicóloga"
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