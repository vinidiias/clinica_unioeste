import styles from './NavBar.module.css'
import { Link } from 'react-router-dom';

import logoUnioeste from '../../img/logoUnioeste.png'
import { useEffect, useState } from 'react';

const NavBar = () => {
    const [user, setUser] = useState({})

    useEffect(() => {
      const user = JSON.parse(sessionStorage.getItem('user'))
      setUser(user)
    },[user])

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
        {Object.keys(user).length === 0 ? (
          <></>
        ) : user.isLogged ? (
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
              <Link to="/">Sair</Link>
            </li>
          </ul>
        ) : (
          <></>
        )}
      </nav>
    );
}

export default NavBar