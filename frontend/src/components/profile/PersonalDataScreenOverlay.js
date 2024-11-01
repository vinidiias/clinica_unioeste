import styles from './PersonalDataScreenOverlay.module.css'
import PersonalData from './PersonalData'
import Adress from './Adress'

const PersonalDataScreenOverlay = ({ customClass, onClose }) => {
    return (
        <div className={styles.overlay}>
            <PersonalData customClass={customClass} onClose={onClose} />
            <Adress />
        </div>
    )
}

export default PersonalDataScreenOverlay