import styles from './Input.module.css'
import { useFormContext } from 'react-hook-form';

const Input = ({ type, name, text, handleOnChange, placeholder, autoComplete, customClass, disabled}) => {

  const { register } = useFormContext()

  
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
        <label htmlFor={name}>{text} *</label>
        <input
          type={type}
          name={name}
          id={name}
          disabled={disabled}
          placeholder={placeholder}
          {...register((name), {required: true})}
          autoComplete={"off" | autoComplete}
        />
      </div>
    );
}

export default Input