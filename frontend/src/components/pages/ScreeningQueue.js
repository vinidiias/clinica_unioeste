import styles from './ScreeningQueue.module.css'
import eu from '../../img/eu.jpeg'
import { FaRegSquare } from "react-icons/fa6";
import { FaCheckSquare } from "react-icons/fa";
import { FaCaretSquareDown } from "react-icons/fa";
import { useState } from 'react';

const ScreeningQueue = () => {
    const [isSelected, setIsSelected] = useState(false)
    const [over, setOver] = useState(false)
    
    function handleClick(index) {
        return isSelected === index ? setIsSelected(!isSelected) : setIsSelected(index)
    }

    return (
      <div className={styles.screening}>
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
          {Array(10)
            .fill(null)
            .map((_, index) => (
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
                <img src={eu} alt="" />
                <h3>Vinícius de Oliveira Dias</h3>
                <h3>Acadêmico</h3>
                <h3>Não</h3>
                <h3>23/11/2024</h3>
              </div>
            ))}
        </div>
      </div>
    );
}

export default ScreeningQueue