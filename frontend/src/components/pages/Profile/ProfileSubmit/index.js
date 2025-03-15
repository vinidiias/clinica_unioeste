import styles from './index.module.css'
import Button from '../../../form/Button';

const ProfileSubmit = ({ txtEdit, txtSubmit, handleSubmit, handleToggle, editState }) => {
    return (
      <div className={styles.buttons}>
        <Button type="button" text={txtEdit} handleClick={handleToggle} />
        {!editState && <Button type="submit" text={txtSubmit} handleClick={handleSubmit} />}
      </div>
    );
}

export default ProfileSubmit