import styles from './Button.module.css'

const Button = ({ text, handleClick, type, customClass }) => {
    return (
      <div className={styles[customClass]}>
        <button onClick={handleClick} type={type} className={styles.btn}>{text}</button>
      </div>
    )
}

export default Button