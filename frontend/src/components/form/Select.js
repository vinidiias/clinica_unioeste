import { useForm, useFormContext } from 'react-hook-form'
import styles from './Select.module.css'
import { useEffect, useState } from "react"

const Select = ({ name, text, options}) => {
    
    const { register } = useFormContext()

    return (
      <div className={styles.select}>
        <label htmlFor={name}>{text} *</label>
        <select defaultValue='' required {...register(name)} name={name} id={name}>
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