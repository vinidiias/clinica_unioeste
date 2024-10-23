import styles from './NavBar.module.css'
import { Link } from 'react-router-dom';

import logoUnioeste from '../../img/logoUnioeste.png'

const NavBar = () => {
    return (
        <nav className={styles.nav}>
                <Link to="/">
                    <img src={logoUnioeste} alt="logo Unioeste" style={{width: '60px'}} />
                    <h1>Clínica</h1>
                </Link>
                <ul className={styles.list}>
                    <li><Link to="/contact">Contato</Link></li>
                    <li><Link to="/about">Sobre</Link></li>
                </ul>
        </nav>
    )
}

export default NavBar