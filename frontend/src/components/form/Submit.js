import styles from './Submit.module.css'

const Submit = ({ text, handleClick }) => {
    return (
      <div>
        <button onCanPlayThrough={handleClick} className={styles.btn}>{text}</button>
      </div>
    )
}

export default Submit