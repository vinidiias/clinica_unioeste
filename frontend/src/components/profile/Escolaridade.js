import { useState } from 'react';
import styles from './PersonalData.module.css'

const Escolaridade = ({ education, curso, turno }) => {
    const [edit, setEdit] = useState(true)
    const [showCurso, setShowCurso] = useState(false)

    const [formData, setFormData] = useState({
        education,
        curso,
        turno
    })

    function editToggle() {
        setEdit(!edit)
        console.log(edit)
    }

    function handleChange(e) {
        if(e.target.value === 'graduacao' |
           e.target.value === 'pos graduacao') setShowCurso(true)
        else setShowCurso(false)

        setFormData(prevStat => ({
          ...prevStat,
          education: e.target.value
        }))
        console.log(formData.education)
      }

      function editHandle(){
        console.log(formData);
        editToggle();
      }

      function handleChangeCurso(e) {
        setFormData(prevStat => ({
            ...prevStat,
            curso: e.target.value
        }))
      }

      function handleChangeTurno(e) {
        setFormData(prevStat => ({
            ...prevStat,
            turno: e.target.value
        }))
      }

    return (
      <div className={styles.containers}>
        <div className={styles.header}>
          <h3>Escolaridade</h3>
        </div>
        <div className={styles.infos}>
          <div className={styles.item}>
            <div className={styles.input}>
              <label htmlFor="education">Escolaridade</label>
              <select
                onChange={handleChange}
                value={formData.education}
                disabled={edit}
                name="education"
                id="education"
              >
                <option value="default">Selecione</option>
                <option value="fundamental I">Fundamental I</option>
                <option value="fundamental II">Fundamental II</option>
                <option value="ensino medio">Ensino Médio</option>
                <option value="ensino tecnico">Ensino Técnico</option>
                <option value="graduacao">Graduação</option>
                <option value="pos graduacao">Pós Graduação</option>
              </select>
            </div>
            {showCurso && (
              <>
                <div className={styles.input}>
                  <label htmlFor="curso">Curso</label>
                  <input type="text" name="curso" id="curso" value={curso} onChange={handleChangeCurso} />
                </div>
                <div className={styles.input}>
                  <label htmlFor="periodo">Ano/Periodo</label>
                  <input type="text" name="periodo" id="periodo" />
                </div>
              </>
            )}
          </div>
          <div className={styles.item}>
            <div className={styles.submitEdit}>
              <button onClick={editToggle}>Editar dados</button>
              {!edit && <button onClick={editHandle}>Confirmar</button>}
            </div>
            {showCurso && (
              <div className={styles.input}>
                <label htmlFor="course_schedule">Ano/Periodo</label>
                <select
                    onChange={handleChange}
                    value={formData.turno}
                    disabled={edit}
                    name="course_schedule"
                    id="course_schedule"
                >
                    <option value="default">Selecione</option>
                    <option value="Manhã">Manhã</option>
                    <option value="Tarde">Tarde</option>
                    <option value="Noite">Noite</option>
                   
                </select>
              </div>
            )}
          </div>
        </div>
      </div>
    );
}

export default Escolaridade