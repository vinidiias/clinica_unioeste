import styles from './ScreeningQueue.module.css'
import api from '../../services/Api'
import Loading from '../layout/Loading'
import Submit from '../form/Submit'
import Patient from '../Queue/Patient'
import { FaCaretSquareDown } from "react-icons/fa";
import React, { useEffect, useState } from 'react';
import { FixedSizeList as List } from 'react-window'
import { useNavigate } from 'react-router-dom'

const ScreeningQueue = () => {
    const [isSelected, setIsSelected] = useState(null)
    const [over, setOver] = useState(false)
    const [fichas, setFichas] = useState([])
    const navigate = useNavigate()
    
    useEffect(() => {
      const allFichas = async () => {
        try{
          const allfichas = await api.get('/ficharios')

          if(allfichas) {
            setFichas(allfichas.data)
          }
         
        } catch(err) {
          console.log(err)
        }
      }

      allFichas()
    }, [fichas.length])

    function handleClick(index) {
        return isSelected === index ? setIsSelected(null) : setIsSelected(index)
    }

      const renderizarPaciente = ({ index, style }) => {
        const ficha = fichas[index];
        console.log('aqui',ficha)

        if (!ficha.ficha.triagem) return null;

        return (
            <div key={index} style={style}>
                <Patient
                    img={ficha.pessoa.img}
                    name={ficha.ficha.user.name}
                    vinculo={ficha.ficha.vinculo.type}
                    indicado="Não"
                    data="23/11/2024"
                    isSelected={isSelected}
                    index={index}
                    setOver={setOver}
                    over={over}
                    handleClick={handleClick}
                />
            </div>
        )
    }

    const navigateToFichaByUser = () => {
      const id = fichas[isSelected].ficha.user._id
      navigate(`/psychologist/screening/${id}`)
    }

    return (
      <>
        {fichas.length === 0 ? (
          <Loading />
        ) : (
          <div className={styles.screening}>
            <div className={styles.headersBtn}>
              {isSelected !== null && <Submit text="Ver fichário"
              handleClick={navigateToFichaByUser}/>}
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
                height={window.innerHeight - 280 } // Altura do container da lista (em pixels)
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