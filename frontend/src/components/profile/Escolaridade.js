import { useState } from 'react';
import styles from './PersonalData.module.css'

const Escolaridade = ({ education='' }) => {
    const [edit, setEdit] = useState(true)

    const [level, setLevel] = useState(education.level)
    const [curso, setCurso] = useState(education.curso)
    const [turno, setTurno] = useState(education.turno)
    const [periodo, setPeriodo] = useState(education.periodo)

    function imcomplete_info() {
      if((curso === undefined | curso === '') |
      (turno === undefined | turno === '') |
      (periodo === undefined | periodo === '')) {
        return 1
      }
      return 0
    }

    function editToggle() {
        setEdit(!edit)
    }

    function editHandle(){
      if(level !== 'graduacao' && level !== 'pos graduacao') {
        const education = ({
          level,
        })
        console.log(education)
        editToggle()
        return
      }
      if(imcomplete_info()) return alert('Informações incompletas!')
      
      const education = {
        level,
        curso,
        periodo,
        turno
      }
      console.log(education)
      editToggle()
      return
    }

    return (
      <div className={styles.containers + ' ' + styles.margin}>
        <div className={styles.header}>
          <h3>Escolaridade</h3>
        </div>
        <div style={{paddingBottom: '0em'}} className={styles.infos}>
          <div className={styles.item}>
            <div className={styles.input}>
              <label htmlFor="level">Escolaridade</label>
              <select
                onChange={(e) => setLevel(e.target.value)}
                value={level}
                disabled={edit}
                name="level"
                id="level"
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
            {(level === "graduacao" || level === "pos graduacao") && (
              <>
                <div className={styles.input}>
                  <label htmlFor="curso">Curso</label>
                  <input
                    type="text"
                    name="curso"
                    id="curso"
                    disabled={edit}
                    value={curso}
                    onChange={(e) => setCurso(e.target.value)}
                  />
                </div>
              </>
            )}
          </div>
          <div className={styles.item}>
            {(level === "graduacao" || level === "pos graduacao") && (
              <>
                <div className={styles.input}>
                  <label htmlFor="turno">Ano/Periodo</label>
                  <select
                    onChange={(e) => setTurno(e.target.turno)}
                    value={turno}
                    disabled={edit}
                    name="turno"
                    id="turno"
                  >
                    <option value="default">Selecione</option>
                    <option value="Manhã">Manhã</option>
                    <option value="Tarde">Tarde</option>
                    <option value="Noite">Noite</option>
                  </select>
                </div>
                <div className={styles.input}>
                  <label htmlFor="periodo">Ano/Periodo</label>
                  <input
                    type="text"
                    name="periodo"
                    id="periodo"
                    disabled={edit}
                    value={periodo}
                    onChange={(e) => setPeriodo(e.target.periodo)}
                  />
                </div>
              </>
            )}
          </div>
          <div className={styles.item}>
            {(level === "graduacao" || level === "pos graduacao") && (
              <div className={styles.input}>
                <label htmlFor="turno">Ano/Periodo</label>
                <select
                  onChange={(e) => setTurno(e.target.turno)}
                  value={turno}
                  disabled={edit}
                  name="turno"
                  id="turno"
                >
                  <option value="default">Selecione</option>
                  <option value="Manhã">Manhã</option>
                  <option value="Tarde">Tarde</option>
                  <option value="Noite">Noite</option>
                </select>
              </div>
            )}
            <div className={styles.submitEdit}>
              <button onClick={editToggle}>Editar dados</button>
              {!edit && <button onClick={editHandle}>Confirmar</button>}
            </div>
          </div>
        </div>
      </div>
    );
}

export default Escolaridade