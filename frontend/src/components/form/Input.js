import styles from './Input.module.css'

const Input = ({ type, name, text, handleOnChange, placeholder, value, autoComplete, customClass, disable}) => {
  
    return (
      <div
        className={`${styles.form_control} ${
          customClass &&
          customClass
            .split(" ")
            .map((cls) => styles[cls])
            .join(" ")
        }`}
      >
        <label htmlFor={name}>{text}:</label>
        <input
          required={true}
          type={type}
          name={name}
          id={name}
          disabled={disable}
          placeholder={placeholder}
          onChange={handleOnChange}
          value={value}
          autoComplete={"" | autoComplete}
        />
      </div>
    );
}

export default Input