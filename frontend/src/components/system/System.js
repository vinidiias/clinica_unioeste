import styles from './System.module.css'

const System = ({ icon, text, handleClick }) => {
    return (
        <button className={styles.btn} onClick={handleClick}>
            {icon}
            <h3>{text}</h3>
        </button>
    )
}

export default System