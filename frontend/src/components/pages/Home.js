import styles from './Home.module.css'

import { useNavigate } from 'react-router-dom';

import { FaPlusCircle } from "react-icons/fa";
import { FaAddressCard } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";

import System from '../system/System';

const Home = () => {
  const navigate = useNavigate()

  const navigateficha = () => {
    navigate('/ficha')
  }
  const navigateprofile = () => {
    navigate('/profile')
  }
  const navigatehistory = () => {
    navigate('/history')
  }

    return (
      <div className={styles.home}>
        <div className={styles.systems}>
          <System text="Dados Pessoais" icon={<FaHistory  style={{color:'#fff'}} /> } handleClick={navigateprofile} />
          <System text="Consultas" icon={<FaPlusCircle style={{color:'#fff'}} />} handleClick={navigateficha} />
          <System text="Histórico de Consultas" icon={<FaHistory  style={{color:'#fff'}} /> } handleClick={navigatehistory} />
        </div>
      </div>
    );
}

export default Home