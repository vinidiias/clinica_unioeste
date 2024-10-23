import styles from './Home.module.css'

import { useNavigate } from 'react-router-dom';

import { FaPlusCircle } from "react-icons/fa";
import { FaAddressCard } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";

import System from '../system/System';

const Home = () => {
  const navigate = useNavigate()

  const writeForm = () => {
    console.log('teste')
    navigate('/ficha')
  }

    return (
      <div className={styles.home}>
        <h1>Meus sistemas</h1>
        <div className={styles.systems}>
          <System text="Dados Pessoais" icon={<FaAddressCard style={{color: '#fff'}} />} />
          <System text="Consultas" icon={<FaPlusCircle style={{color:'#fff'}} />} handleClick={writeForm} />
          <System text="Histórico de Consultas" icon={<FaHistory style={{color:'#fff'}} />} />
        </div>
      </div>
    );
}

export default Home