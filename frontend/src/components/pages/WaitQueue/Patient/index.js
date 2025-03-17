import { FaCheckSquare } from 'react-icons/fa';
import { FaRegSquare } from 'react-icons/fa6';

import styles from './index.module.css'

const Patient = ({ img, name, vinculo, prioridade='Não', date, priority, isSelected, index, setOver, over, handleClick, consultated }) => {
  const data = new Date(date)
  
    return (
      <div
        className={`${styles.patients} ${
          styles[isSelected === index ? "selected" : " "]
        } ${styles[over === index ? "over" : " "]}`}
        key={index}
        tabIndex={0}
        onClick={() => handleClick(index)}
        onMouseOver={() => setOver(index)}
        onKeyDown={(e) => e.key === "Enter" && handleClick(index)}
      >
        <h3>{index}</h3>
        {isSelected === index ? <FaCheckSquare /> : <FaRegSquare />}
        {img ? (
          <img src={img} alt="" />
        ) : (
          <h3>Sem foto</h3>
        )}
        <h3>{name}</h3>
        <h3>{vinculo}</h3>
        <h3>{prioridade}</h3>
        <h3>{`${data.getDate()}/${data.getMonth()}/${data.getFullYear()}`}</h3>
        <h3>{consultated}</h3>
      </div>
    )
}

export default Patient