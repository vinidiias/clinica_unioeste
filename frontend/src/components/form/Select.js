import { useFormContext } from 'react-hook-form'
import styles from './Select.module.css'
import { useEffect, useState } from "react"

const Select = ({ name, text, options}) => {
    
    const { register, watch } = useFormContext()

    const value = watch(name)

    useEffect(() => {
        console.log(value)
    }, [value])

    return (
      <div className={styles.select}>
        <label htmlFor={name}>{text} *</label>
        <select required {...register(name)} name={name} id={name}>
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