import styles from'./Footer.module.css'

import { IoLogoWhatsapp } from "react-icons/io";
import { TiSocialInstagram } from "react-icons/ti";
import { AiFillLinkedin } from "react-icons/ai";
import { AiOutlineGlobal } from "react-icons/ai";


const Footer = () => {
    return (
      <footer className={styles.footer}>
        <div className={styles.copy_right}>
          <p>&copy; 2024 Todos os Direitos Reservados</p>
          <p style={{display: 'inline-block', marginRight:'5px'}}>Unioeste - Universidade Estadual do Oeste do Paraná</p>
          <a href="wa.me/5545991330882" target='_blank' rel="noopener noreferrer"><IoLogoWhatsapp /></a>
          <a href="https://www.instagram.com/unioestepr/" target='_blank' rel="noopener noreferrer"><TiSocialInstagram /></a>
          <a href="https://www.linkedin.com/school/unioeste1/?originalSubdomain=br" target='_blank' rel="noopener noreferrer"><AiFillLinkedin /></a>
          <a href="https://www.unioeste.br/portal/" target='_blank' rel="noopener noreferrer"><AiOutlineGlobal /></a>
        </div>

      </footer>
    );
}

export default Footer