import styles from './ScreeningQueue.module.css'
import api from '../../services/Api'
import Loading from '../layout/Loading'
import Submit from '../form/Submit'
import Patient from '../Queue/Patient'
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

          if(allfichas) {
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
      <>
        {fichas.length === 0 ? (
          <Loading />
        ) : (
          <div className={styles.screening}>
            <div className={styles.headersBtn}>
              <Submit text="Atender" />
              <Submit text="Remover" />
            </div>
            <div className={styles.queue_container}>
              <div className={styles.header}>
                <h3>ID</h3>
                <FaCaretSquareDown />
                <h3>Foto</h3>
                <h3>Nome</h3>
                <h3>Tipo</h3>
                <h3>Indicado</h3>
                <h3>Data</h3>
              </div>
              {fichas
                .filter((ficha) => ficha.pessoa.triagem === true)
                .map((ficha, index) => (
                  <>
                    <Patient
                      img={ficha.pessoa.img}
                      name={ficha.ficha.name}
                      vinculo={ficha.ficha.vinculo}
                      indicado="Não"
                      data="23/11/2024"
                      isSelected={isSelected}
                      key={index}
                      index={index}
                      setOver={setOver}
                      over={over}
                      handleClick={handleClick}
                    />
                  </>
                ))}
            </div>
          </div>
        )}
      </>
    );
}


export default ScreeningQueue