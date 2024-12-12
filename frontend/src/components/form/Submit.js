import styles from './Submit.module.css'

const Submit = ({ text, handleClick, customClass }) => {
    return (
      <div className={styles[customClass]}>
        <button onClick={handleClick} className={styles.btn}>{text}</button>
      </div>
    )
}

export default Submit