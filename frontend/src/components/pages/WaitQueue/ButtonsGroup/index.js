import styles from './index.module.css'
import Submit from '../../../form/Button'

const ButtonsGroup = ({ selected, handleNavigate, txt1, txt2 }) => {
    return (
      <div className={styles.headersBtn}>
        {selected !== null && (
          <>
            <Submit text={txt1} handleClick={handleNavigate} />
            <Submit text={txt2} />
          </>
        )}
      </div>
    );
}

export default ButtonsGroup