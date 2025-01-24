import styles from '../PersonalData/index.module.css'
import Button from '../../../form/Button';
import Input from '../../../form/Input';
import Select from '../../../form/Select';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import ProfileSubmit from '../ProfileSubmit';

const Education = ({ education='' }) => {
    const [edit, setEdit] = useState(true)
    const { watch } = useFormContext()

    const fields = [
      {
        field:<Select name={"education.level"} text={"Escolaridade"} options={['Fundamental I', 'Fundamental II', 'Ensino Médio', 'Ensino Técnico', 'Graduação', 'Pós-Graduação']} disabled={edit} />,
      },
      {
        field: <Select name={"education.shift"} text={"Turno"}  options={[ 'Fundamental I', 'Fundamental II', 'Ensino Médio', 'Ensino Técnico', 'Graduação', 'Pós-Graduação']} disabled={edit} />,
        dep: {
          name: 'education.level',
          value: ['Pós Graduação', 'Graduação']
        }
      },
      {
        field: <Input name={"education.course"} text={"Curso"} type={"text"} disabled={edit} />,
        dep: {
          name: 'education.level',
          value: ['Pós Graduação', 'Graduação']
        }
      },
      {
        field: <Input name={"education.period"} text={"Ano/Período"} type={"text"} disabled={edit} />,
        dep: {
          name: 'education.level',
          value: ['Pós Graduação', 'Graduação']
        }
      },
    ];

    function editToggle() {
        setEdit(!edit)
    }

    function editHandle(){    
      editToggle()
      return
    }

    return (
      <div className={styles.containers + ' ' + styles.margin}>
        <div className={styles.header}>
          <h3>Escolaridade</h3>
        </div>
        <div style={{paddingBottom: '0em'}} className={styles.infos}>
        {fields.map((field, index) => {
          if(field.dep) {
            const value = watch(field.dep.name)
            if(field.dep.value.some(dep => dep === value)) {
              return (
                <div className={styles.item} key={index}>
                  {field.field}
                </div>
              )
            }
          } else {
            return (
              <div className={styles.item} key={index}>
                {field.field}
              </div>
            )
          }
        })}
        </div>
        <ProfileSubmit txtEdit="Editar Dados" txtSubmit="Confirmar" handleSubmit={editHandle} handleToggle={editToggle} editState={edit} />
      </div>
    );
}

export default Education