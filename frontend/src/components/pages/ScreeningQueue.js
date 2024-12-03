import styles from './ScreeningQueue.module.css'
import api from '../../services/Api'
import Loading from '../layout/Loading'
import Submit from '../form/Submit'
import Patient from '../Queue/Patient'
import { FaCaretSquareDown } from "react-icons/fa";
import React, { useEffect, useState } from 'react';
import { FixedSizeList as List } from 'react-window'
import ReactDOM from 'react-dom'

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

      const renderizarPaciente = ({ index, style }) => {
        const ficha = fichas[index];

        if (!ficha.pessoa.triagem) return null;

        return (
            <div key={index} style={style}>
                <Patient
                    img={ficha.pessoa.img}
                    name={ficha.ficha.user.name}
                    vinculo={ficha.ficha.vinculo}
                    indicado="Não"
                    data="23/11/2024"
                    isSelected={isSelected}
                    index={index}
                    setOver={setOver}
                    over={over}
                    handleClick={handleClick}
                />
            </div>
        );
    };

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
              <List
                height={window.innerHeight - 150} // Altura do container da lista (em pixels)
                itemCount={fichas.length} // Total de itens na lista
                itemSize={70} // Altura de cada item
                width="100%" // Largura da lista
              >
                {renderizarPaciente}
              </List>
            </div>
          </div>
        )}
      </>
    );
}


export default ScreeningQueue