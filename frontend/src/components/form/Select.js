import { useFormContext } from 'react-hook-form'
import styles from './Select.module.css'

const Select = ({ name, text, options, disabled }) => {
    
    const { register } = useFormContext()

    return (
      <div className={styles.select}>
        <label htmlFor={name}>{text} *</label>
        <select disabled={disabled} defaultValue='' required {...register(name)} name={name} id={name}>
          <option value="" hidden>Selecione uma opção</option>
          {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
          ))}
        </select>
      </div>
    );
}

export default Select