import styles from './Table.module.css'

import CheckBox from './CheckBox'

const Table = ({ handleChange, selected }) => {
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
                <tr>
                  <th>Turno</th>
                  <th>Segunda</th>
                  <th>Terça</th>
                  <th>Quarta</th>
                  <th>Quinta</th>
                  <th>Sexta</th>
                </tr>
                <tr>
                  <td>Manhã</td>
                  <td><CheckBox selected={selected} handleOnChange={handleChange} customClass="justify"  name="morning_monday"   text=""  /></td>
                  <td><CheckBox selected={selected} handleOnChange={handleChange} customClass="justify"  name="morning_tuesday"  text=""  /></td>
                  <td><CheckBox selected={selected} handleOnChange={handleChange} customClass="justify"  name="mornin_wednesday" text=""  /></td>
                  <td><CheckBox selected={selected} handleOnChange={handleChange} customClass="justify"  name="morning_thursday" text=""  /></td>
                  <td><CheckBox selected={selected} handleOnChange={handleChange} customClass="justify"  name="morning_friday"   text=""  /></td>
                </tr>
                <tr>
                  <td>Tarde</td> 
                  <td><CheckBox selected={selected} handleOnChange={handleChange} customClass="justify"  name="afternoon_monday"    text=""  /></td>
                  <td><CheckBox selected={selected} handleOnChange={handleChange} customClass="justify"  name="afternoon_tuesday"   text=""  /></td>
                  <td><CheckBox selected={selected} handleOnChange={handleChange} customClass="justify"  name="afternoon_wednesday" text=""  /></td>
                  <td><CheckBox selected={selected} handleOnChange={handleChange} customClass="justify"  name="afternoon_thursday"  text=""  /></td>
                  <td><CheckBox selected={selected} handleOnChange={handleChange} customClass="justify"  name="afternoon_friday"    text=""  /></td>
                </tr>
                <tr>
                  <td>Noite</td> 
                  <td><CheckBox selected={selected} handleOnChange={handleChange} customClass="justify"  name="night_monday"    text=""  /></td>
                  <td><CheckBox selected={selected} handleOnChange={handleChange} customClass="justify"  name="night_tuesday"   text=""  /></td>
                  <td><CheckBox selected={selected} handleOnChange={handleChange} customClass="justify"  name="night_wednesday" text=""  /></td>
                  <td><CheckBox selected={selected} handleOnChange={handleChange} customClass="justify"  name="night_thursday"  text=""  /></td>
                  <td><CheckBox selected={selected} handleOnChange={handleChange} customClass="justify"  name="night_friday"    text=""  /></td>
                </tr>
              </table>
            </div>
    )
}

export default Table