import styles from './NavBar.module.css'
import { Link } from 'react-router-dom';

import logoUnioeste from '../../img/logoUnioeste.png'
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const NavBar = () => {
  const { userData } = useContext(UserContext)

    return (
      <nav className={styles.nav}>
        <Link to="/home">
          <img
            src={logoUnioeste}
            alt="logo Unioeste"
            style={{ width: "60px" }}
          />
          <h1>Clínica</h1>
        </Link>
        {userData.isLogged && (
          <ul className={styles.list}>
            <li>
              <Link to="/home">Menu</Link>
            </li>
            <li>
              <Link to="/contact">Contato</Link>
            </li>
            <li>
              <Link to="/about">Sobre</Link>
            </li>
            <li>
              <Link to="/login">Sair</Link>
            </li>
          </ul>
        )}
      </nav>
    );
}

export default NavBar