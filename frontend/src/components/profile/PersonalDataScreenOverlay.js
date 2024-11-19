import styles from './PersonalDataScreenOverlay.module.css'
import PersonalData from './PersonalData'

const PersonalDataScreenOverlay = ({ customClass, onClose }) => {
    return (
        <div className={styles.overlay}>
            <PersonalData customClass={customClass} onClose={onClose} />
        </div>
    )
}

export default PersonalDataScreenOverlay