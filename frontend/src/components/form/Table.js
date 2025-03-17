import styles from './Table.module.css'
import CheckBox from './CheckBox'
import { table_ficha_fields } from '../util/fields_config'

const Table = ({ title, disabled, fields, headsFields }) => {
    const heads = ['Turno', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta']

    return (
      <div className={styles.table_container}>
        <h3>{title}</h3>
        <div className={styles.table}>
          <table>
            <thead>
              <tr>
                {headsFields ? (
                  <>
                    {headsFields.map((head) => (
                      <th key={head}>{head}</th>
                    ))}
                  </>
                ) : (
                  <>
                    {heads.map((head) => (
                      <th key={head}>{head}</th>
                    ))}
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {fields ? (
                <>
                  {fields.map((row) => (
                    <tr>
                      {row.cell.map((check) => (
                        <td>
                          <CheckBox
                            name={check.name}
                            customClass="table"
                            disabled={disabled}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </>
              ) : (
                <>
                  {table_ficha_fields.map((row) => (
                    <tr>
                      <td>{row.turno}</td>
                      {row.cell.map((check) => (
                        <td>
                          <CheckBox
                            name={check.name}
                            customClass="table"
                            disabled={disabled}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
}

export default Table