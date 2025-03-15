import { useFormContext } from 'react-hook-form';
import styles from './TextArea.module.css'

const TextArea = ({ label, name, rows, disabled, placeholder }) => {

    const { register } = useFormContext()

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
          disabled={disabled}
          {...register(name)}
        ></textarea>
      </div>
    );
}

export default TextArea