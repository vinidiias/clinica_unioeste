import styles from './Table.module.css'

import CheckBox from './CheckBox'

const Table = ({ setPreferredDay, preferredDay }) => {
    
  function CheckBoxChange(e) {
      const {name, checked} = e.target

      setPreferredDay(prevState =>{
        if(checked){
          return {...prevState, [name]: checked}
        }
        else {
          const aux = {...prevState}
          delete aux[name]
          return aux
        }
      })
    }

    return(
<div className={styles.table}>
              <p
                style={{
                  fontSize: ".9em",
                  fontWeight: "bold",
                  marginRight: "5px",
                }}
              >
                Dia de preferência:
              </p>
              <table>
                <thead>
                  <tr>
                    <th>Turno</th>
                    <th>Segunda</th>
                    <th>Terça</th>
                    <th>Quarta</th>
                    <th>Quinta</th>
                    <th>Sexta</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Manhã</td>
                    <td><CheckBox selected={preferredDay.morning_day} handleOnChange={CheckBoxChange} customClass="justify"  name="morning_monday"   text=""  /></td>
                    <td><CheckBox selected={preferredDay.morning_tuesday} handleOnChange={CheckBoxChange} customClass="justify"  name="morning_tuesday"  text=""  /></td>
                    <td><CheckBox selected={preferredDay.mornin_wednesday} handleOnChange={CheckBoxChange} customClass="justify"  name="mornin_wednesday" text=""  /></td>
                    <td><CheckBox selected={preferredDay.morning_thursday} handleOnChange={CheckBoxChange} customClass="justify"  name="morning_thursday" text=""  /></td>
                    <td><CheckBox selected={preferredDay.morning_friday} handleOnChange={CheckBoxChange} customClass="justify"  name="morning_friday"   text=""  /></td>
                  </tr>
                  <tr>
                    <td>Tarde</td>
                    <td><CheckBox selected={preferredDay.afternoon_monday} handleOnChange={CheckBoxChange} customClass="justify"  name="afternoon_monday"    text=""  /></td>
                    <td><CheckBox selected={preferredDay.afternoon_tuesday} handleOnChange={CheckBoxChange} customClass="justify"  name="afternoon_tuesday"   text=""  /></td>
                    <td><CheckBox selected={preferredDay.afternoon_wednesday} handleOnChange={CheckBoxChange} customClass="justify"  name="afternoon_wednesday" text=""  /></td>
                    <td><CheckBox selected={preferredDay.afternoon_thursday} handleOnChange={CheckBoxChange} customClass="justify"  name="afternoon_thursday"  text=""  /></td>
                    <td><CheckBox selected={preferredDay.afternoon_friday} handleOnChange={CheckBoxChange} customClass="justify"  name="afternoon_friday"    text=""  /></td>
                  </tr>
                  <tr>
                    <td>Noite</td>
                    <td><CheckBox selected={preferredDay.night_monday} handleOnChange={CheckBoxChange} customClass="justify"  name="night_monday"    text=""  /></td>
                    <td><CheckBox selected={preferredDay.night_tuesday} handleOnChange={CheckBoxChange} customClass="justify"  name="night_tuesday"   text=""  /></td>
                    <td><CheckBox selected={preferredDay.night_wednesday} handleOnChange={CheckBoxChange} customClass="justify"  name="night_wednesday" text=""  /></td>
                    <td><CheckBox selected={preferredDay.night_thursday} handleOnChange={CheckBoxChange} customClass="justify"  name="night_thursday"  text=""  /></td>
                    <td><CheckBox selected={preferredDay.night_friday} handleOnChange={CheckBoxChange} customClass="justify"  name="night_friday"    text=""  /></td>
                  </tr>
                </tbody>
              </table>
            </div>
    )
}

export default Table