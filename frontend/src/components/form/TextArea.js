import { useForm, useFormContext } from 'react-hook-form';
import styles from './TextArea.module.css'

const TextArea = ({ label, name, rows, handleOnChange, value, disabled, placeholder }) => {

    const { register } = useForm()

    return (
      <div className={styles.observation}>
        <label htmlFor={name}>
          {label} *
        </label>
        <textarea
          placeholder={placeholder}
          name={name}
          id={name}
          rows={rows}
          {...register(name)}
        ></textarea>
      </div>
    );
}

export default TextArea