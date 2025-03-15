import styles from './index.module.css'
import Submit from '../../../form/Button'

const ButtonsGroup = ({ selected, handleNavigate }) => {
    return (
        <div className={styles.headersBtn}>
        {selected !== null && <Submit text="Ver fichário"
        handleClick={handleNavigate}/>}
        <Submit text="Atender" />
        <Submit text="Remover" />
      </div>
    )
}

export default ButtonsGroup