import styles from './Table.module.css'
import CheckBox from './CheckBox'

const Table = ({ title, disabled }) => {
    const heads = ['Turno', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta']
    const body = [
      { turno: 'Manhã', type: 'label', cell: [
        { name: "preferred_day.morning_monday", type: 'checkbox'},
        { name: "preferred_day.morning_tuesday", type: 'checkbox'},
        { name: "preferred_day.morning_wednesday", type: 'checkbox'},
        { name: "preferred_day.morning_thursday", type: 'checkbox'},
        { name: "preferred_day.morning_friday", type: 'checkbox'},
      ]},
      { turno: 'Tarde', type: 'label', cell: [
        { name: "preferred_day.afternoon_monday", type: 'checkbox'},
        { name: "preferred_day.afternoon_tuesday", type: 'checkbox'},
        { name: "preferred_day.afternoon_wednesday", type: 'checkbox'},
        { name: "preferred_day.afternoon_thursday", type: 'checkbox'},
        { name: "preferred_day.afternoon_friday", type: 'checkbox'},
      ]},
      { turno: 'Noite', type: 'label', cell: [
        { name: "preferred_day.night_monday", type: 'checkbox'},
        { name: "preferred_day.night_tuesday", type: 'checkbox'},
        { name: "preferred_day.night_wednesday", type: 'checkbox'},
        { name: "preferred_day.night_thursday", type: 'checkbox'},
        { name: "preferred_day.night_friday", type: 'checkbox'},
      ]},
    ]

    return (
      <div className={styles.table_container}>
        <h3>{title}</h3>
        <div className={styles.table}>
          <table>
            <thead>
              <tr>
                {heads.map((head) => (
                  <th>{head}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {body.map((row) => (
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
            </tbody>
          </table>
        </div>
      </div>
    );
}

export default Table