import styles from './CheckBox.module.css'

const CheckBox = ({ name, text, side, handleOnChange, value, isSelected, customClass }) => {

  const inputId = `${name}-${value}`;
    return (
      <div className={`${styles.form_control} ${styles[customClass]}`}>
        {side === "left" && (
          <label htmlFor={value} className={styles.label_left}>
            {text}
          </label>
        )}
        <input
          required={true}
          type="checkbox"
          checked={isSelected}
          name={name}
          id={inputId}
          onChange={handleOnChange}
          value={value || ''}
        />
        {side === "right" && (
          <label htmlFor={inputId} className={styles.label_right}>
            {text}
          </label>
        )}
      </div>
    );
}

export default CheckBox
