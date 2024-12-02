import styles from './ScreeningQueue.module.css'
import api from '../../services/Api'
import Loading from '../layout/Loading'
import { FaRegSquare } from "react-icons/fa6";
import { FaCheckSquare } from "react-icons/fa";
import { FaCaretSquareDown } from "react-icons/fa";
import { useEffect, useState } from 'react';

const ScreeningQueue = () => {
    const [isSelected, setIsSelected] = useState(false)
    const [over, setOver] = useState(false)
    const [fichas, setFichas] = useState([])
    
    useEffect(() => {
      const allFichas = async () => {
        try{
          const allfichas = await api.get('/ficharios')

          if(fichas) {
            console.log(allfichas.data)
            setFichas(allfichas.data)
          }
         
        } catch(err) {
          console.log(err)
        }
      }

      allFichas()
    }, [fichas.length])

    function handleClick(index) {
        return isSelected === index ? setIsSelected(!isSelected) : setIsSelected(index)
    }

    return (
      <div className={styles.screening}>
        <div className={styles.queue_container}>
          {fichas.length === 0 ? <Loading /> : (
            <>
            <div className={styles.header}>
            <h3>ID</h3>
            <FaCaretSquareDown />
            <h3>Foto</h3>
            <h3>Nome</h3>
            <h3>Tipo</h3>
            <h3>Indicado</h3>
            <h3>Data</h3>
          </div>
          {fichas.filter((ficha) => ficha.pessoa.triagem === true).map((ficha, index) => (
              <div
                className={`${styles.patients} ${styles[isSelected === index ? "selected" : " "]} ${styles[over === index ? "over" : " "]}`}
                key={index}
                tabIndex={0}
                onClick={() => handleClick(index)}
                onMouseOver={() => setOver(index)}
                onKeyDown={(e) => e.key === "Enter" && handleClick(index)}
              >
                <h3>{index}</h3>
                {isSelected === index ?  <FaCheckSquare /> : <FaRegSquare />}
                {ficha.pessoa.img ? <img src={ficha.pessoa.img} alt="" /> : <h3>Sem foto</h3>}
                <h3>{ficha.ficha.user.name}</h3>
                <h3>{ficha.ficha.vinculo}</h3>
                <h3>Não</h3>
                <h3>23/11/2024</h3>
              </div>
            ))}
            </>
          )}
        </div>
      </div>
    );
}

export default ScreeningQueue