import styles from './Table.module.css'
import CheckBox from './CheckBox'

const Table = ({ viewPatientFicha, setPreferredDay, preferredDay }) => {
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

    return (
      <div className={styles.table_container}>
        <p>Dia de preferência *</p>
        <div className={styles.table}>
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
                <td>
                  <CheckBox
                    disabled={viewPatientFicha}
                    customClass="justify"
                    name="morning_monday"
                    text=""
                  />
                </td>
                <td>
                  <CheckBox
                    disabled={viewPatientFicha}
                    customClass="justify"
                    name="morning_tuesday"
                    text=""
                  />
                </td>
                <td>
                  <CheckBox
                    disabled={viewPatientFicha}
                    customClass="justify"
                    name="morning_wednesday"
                    text=""
                  />
                </td>
                <td>
                  <CheckBox
                    disabled={viewPatientFicha}
                    customClass="justify"
                    name="morning_thursday"
                    text=""
                  />
                </td>
                <td>
                  <CheckBox
                    disabled={viewPatientFicha}
                    customClass="justify"
                    name="morning_friday"
                    text=""
                  />
                </td>
              </tr>
              <tr>
                <td>Tarde</td>
                <td>
                  <CheckBox
                    disabled={viewPatientFicha}
                    customClass="justify"
                    name="afternoon_monday"
                    text=""
                  />
                </td>
                <td>
                  <CheckBox
                    disabled={viewPatientFicha}
                    customClass="justify"
                    name="afternoon_tuesday"
                    text=""
                  />
                </td>
                <td>
                  <CheckBox
                    disabled={viewPatientFicha}
                    customClass="justify"
                    name="afternoon_wednesday"
                    text=""
                  />
                </td>
                <td>
                  <CheckBox
                    disabled={viewPatientFicha}
                    customClass="justify"
                    name="afternoon_thursday"
                    text=""
                  />
                </td>
                <td>
                  <CheckBox
                    disabled={viewPatientFicha}
                    customClass="justify"
                    name="afternoon_friday"
                    text=""
                  />
                </td>
              </tr>
              <tr>
                <td>Noite</td>
                <td>
                  <CheckBox
                    disabled={viewPatientFicha}
                    customClass="justify"
                    name="night_monday"
                    text=""
                  />
                </td>
                <td>
                  <CheckBox
                    disabled={viewPatientFicha}
                    customClass="justify"
                    name="night_tuesday"
                    text=""
                  />
                </td>
                <td>
                  <CheckBox
                    disabled={viewPatientFicha}
                    customClass="justify"
                    name="night_wednesday"
                    text=""
                  />
                </td>
                <td>
                  <CheckBox
                    disabled={viewPatientFicha}
                    customClass="justify"
                    name="night_thursday"
                    text=""
                  />
                </td>
                <td>
                  <CheckBox
                    disabled={viewPatientFicha}
                    customClass="justify"
                    name="night_friday"
                    text=""
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
}

export default Table