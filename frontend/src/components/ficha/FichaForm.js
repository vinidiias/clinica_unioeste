import styles from './FichaForm.module.css'

import { useState } from 'react'

import Input from '../form/Input'
//import Select from '../form/Select'
//import Submit from '../form/Submit'
import CheckBox from '../form/CheckBox'
import Table from '../form/Table'

const FichaForm = () => {

  const [fichaForm, setFichaForm] = useState({})
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [birth, setBirth] = useState('')
  const [sex, setSex] = useState('')
  const [ra, setRa] = useState('')
  const [cpf, setCpf] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [adress, setAdress] = useState('')
  const [numberAdress, setNumberAdress] = useState('')
  const [profission, setProfission] = useState('')
  const [education, setEducation] = useState({
    type:'',
    curso: '',
    periodo: '',
    turno: '',
  })
  const [curso, setCurso] = useState('')
  const [periodo, setPeriodo] = useState('')
  const [turno, setTurno] = useState('')
  const [preferredDay, setPreferredDay] = useState({})
  const [vinculo, setVinculo] = useState({
    type: false,
    typeVinculo: '',
    setor: '',
  })
  const [setor, setSetor] = useState('')
  const [comunidade, setComunidade] = useState('')
  const [work, setWork] = useState({
    type: '',
    hours: '',
  })
  const [horarioWork, setHorarioWork] = useState('')
  const [psicologa, setPsicologa] = useState({
    type: '',
    time: '',
  })
  const [timePsicologa, setTimePsicologa] = useState('')
  const [psiquiatra, setPsiquiatra] = useState({
    type: '',
    time: '',
  })
  const [timePsiquiatra, setTimePsiquiatra] = useState('')
  const [observation, setObservation] = useState('')

  const [showPsychi, setShowPsychi] = useState(false)
  const [showPsycho, setShowPsycho] = useState(false)
  const [showWork, setShowWork] = useState(false)
  const [showSetor, setShowSetor] = useState(false)
  const [showCurso, setShowCurso] = useState(false)
  const [showTypeVinculo, setShowTypeVinculo] = useState(false)

  function showDate(e){
    e.preventDefault()
    console.log(fichaForm)
  }

  function handleChange(e) {
    const { name, value } = e.target

    const setters = {
      name: setName,
      age: setAge,
      birth: setBirth,
      sex: setSex,
      ra: setRa,
      cpf: setCpf,
      phone: setPhone,
      email: setEmail,
      adress: setAdress,
      numberAdress: setNumberAdress,
      profission: setProfission,
      observation: setObservation
    }

    if(setters[name]) {
      setters[name](value)
    }
  }

  function handleShowPsychi(currentPsychi){
    if(currentPsychi === 'Acompanha') setShowPsychi(true)
      else setShowPsychi(false)
  }

  function handleShowPsycho(currentPsycho) {
    if(currentPsycho === 'Acompanha') setShowPsycho(true)
    else setShowPsycho(false)
  }

function handleShowWork(currentWork) {
  if(currentWork === 'Trabalha') setShowWork(true)
  else setShowWork(false)
}

  function handleSetShowSetor(currentSetor) {
    if (currentSetor === 'Agente') {
      setShowSetor(true);
    } else {
      setShowSetor(false);
    }
  }

  function handleSetShowTypeVinculo(currentVinculo) {
    if (currentVinculo !== null) {
      setShowTypeVinculo(true);
    } else {
      setShowTypeVinculo(false);
    }
  }

  function handleSetShowCurso(currentSchool) {
    if (currentSchool === "Graduação" || currentSchool === "Pós Graduação") {
      setShowCurso(true);
    } else {
      setShowCurso(false);
    }
  }

    return (
      <form className={styles.ficha_form}>
        <div>
          <Input
            type="text"
            handleOnChange={handleChange}
            name="name"
            text="Nome"
            autoComplete="username"
            customClass="flex_1"
          />
        </div>
        <div className={styles.flex}>
          <div><Input type="number" name="age" text="Idade" handleOnChange={handleChange} /></div>
          <Input type="date" name="birth" text="Data de Nascimento" handleOnChange={handleChange} />
          <div className={styles.sex}>
            <label htmlFor="sexo-F" className={styles.label}>
              Sexo:
            </label>
            <CheckBox
              side="right"
              isSelected={sex}
              name="sexo"
              value="F"
              text="( )F"
              handleOnChange={(e) => {setSex(e.target.value)}}
              customClass="title"
            />
            <CheckBox
              side="right"
              isSelected={sex}
              name="sexo"
              value="M"
              text="( )M"
              handleOnChange={(e) => {setSex(e.target.value)}}
            />
          </div>
        </div>
        <div className={styles.flex}>
          <Input type="number" name="ra" text="RA" handleOnChange={handleChange} />
          <Input type="text" name="cpf" text="CPF" handleOnChange={handleChange} />
        </div>
        <div className={styles.flex}>
          <Input
            type="number"
            name="tel"
            text="Telefone ( )"
            autoComplete="tel"
            handleOnChange={handleChange}
          />
          <Input type="email" name="email" text="Email" autoComplete="email" handleOnChange={handleChange} />
        </div>
        <div className={styles.flex}>
          <Input
            type="text"
            name="adress"
            text="Endereço"
            autoComplete="adress"
            handleOnChange={handleChange}
          />
          <Input type="number" name="adressNumber" text="Número" handleOnChange={handleChange} />
        </div>
        <Input type="text" name="profission" text="Profissão" customClass="flex_1" handleOnChange={handleChange} />
        <div style={{ marginBottom: "1em" }} className={styles.flex}>
          <label htmlFor="level-Fundamental I" className={styles.label}>
            Escolaridade:
          </label>
          <div>
            <CheckBox
              isSelected={education.type === "Fundamental I"}
              name="level"
              side="right"
              text="Fundamental I"
              value="Fundamental I"
              handleOnChange={(e) => setEducation({type: e.target.value})}
            />
            <CheckBox
              isSelected={education.type === "Fundamental II"}
              side="right"
              name="level"
              text="Fundamental II"
              value="Fundamental II"
              handleOnChange={(e) => setEducation({type: e.target.value})}
            />
            <CheckBox
              isSelected={education.type === "Ensino Médio"}
              side="right"
              name="level"
              text="Ensino Médio"
              value="Ensino Médio"
              handleOnChange={(e) => setEducation({type: e.target.value})}
            />
            <CheckBox
              isSelected={education.type === "Ensino Técnico"}
              side="right"
              name="level"
              text="Ensino Técnico"
              value="Ensino Técnico"
              handleOnChange={(e) => setEducation({type: e.target.value})}
            />
            <CheckBox
              isSelected={education.type === "Graduação"}
              side="right"
              name="level"
              text="Graduação"
              value="Graduação"
              handleOnChange={(e) => setEducation({type: e.target.value})}
            />
            <CheckBox
              isSelected={education.type === "Pós Graduação"}
              side="right"
              name="level"
              text="Pós Graduação"
              value="Pós Graduação"
              handleOnChange={(e) => setEducation({type: e.target.value})}
            />
            {showCurso && (
              <div style={{ marginTop: "1em" }}>
                <div className={styles.flex}>
                  <Input type="text" name="curso" text="Curso" handleOnChange={(e) => {
                    setEducation(prevStat => ({
                      ...prevStat,
                      curso: e.target.value
                    }))
                  }} />
                  <Input type="text" name="periodo" text="Ano/período" handleOnChange={(e) => {
                    setEducation(prevStat => ({
                      ...prevStat,
                      periodo: e.target.value
                    }))
                  }} />
                </div>
                <div className={styles.flex}>
                  <label htmlFor="curso" className={styles.label}>
                    Turno do seu curso:
                  </label>
                  <CheckBox
                    isSelected={education.turno === "Manhã"}
                    side="right"
                    value="Manhã"
                    name="course_schedule"
                    text="Manhã"
                    handleOnChange={(e) => {
                      setEducation(prevStat => ({
                        ...prevStat,
                        turno: e.target.value
                      }))
                    }}
                  />
                  <CheckBox
                    isSelected={education.turno === "Tarde"}
                    side="right"
                    value="Tarde"
                    name="course_schedule"
                    text="Tarde"
                    handleOnChange={(e) => {
                      setEducation(prevStat => ({
                        ...prevStat,
                        turno: e.target.value
                      }))
                    }}
                  />
                  <CheckBox
                    isSelected={education.turno === "Noite"}
                    side="right"
                    value="Noite"
                    name="course_schedule"
                    text="Noite"
                    handleOnChange={(e) => {
                      setEducation(prevStat => ({
                        ...prevStat,
                        turno: e.target.value
                      }))
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        <div>
          <Table
            setPreferredDay={setPreferredDay}
            preferredDay={preferredDay}
          />
        </div>
        <div style={{ marginBottom: "1em" }} className={styles.flex}>
          <CheckBox
            isSelected={vinculo.type}
            customClass="bold"
            side="right"
            value="Vínculo com Unioeste"
            name="vinculo_com_unioeste"
            text="Vínculo com Unioeste:"
            handleOnChange={(e) => setVinculo({
              type: !vinculo.type
            })}
          />
          {vinculo.type && (
            <div className={styles.flex}>
              <CheckBox
                isSelected={vinculo.typeVinculo === "Docente"}
                side="right"
                value="Docente"
                name="vinculo_com_unioeste"
                text="Docente"
                handleOnChange={(e) => setVinculo(prevStat => ({
                  ...prevStat,
                  typeVinculo: e.target.value
                }))}
              />
              <CheckBox
                isSelected={vinculo.typeVinculo === "Agente"}
                side="right"
                value="Agente"
                name="type"
                text="Agente"
                handleOnChange={(e) => setVinculo(prevStat => ({
                  ...prevStat,
                  typeVinculo: e.target.value
                }))}
              />
              <CheckBox
                isSelected={vinculo.typeVinculo === "Acadêmico"}
                side="right"
                value="Acadêmico"
                name="vinculo_com_unioeste"
                text="Acadêmico"
                handleOnChange={(e) => setVinculo(prevStat => ({
                  ...prevStat,
                  typeVinculo: e.target.value
                }))}
              />
              <CheckBox
                isSelected={vinculo.typeVinculo === "Estagiário"}
                side="right"
                value="Estagiário"
                name="vinculo_com_unioeste"
                text="Estagiário"
                handleOnChange={(e) => setVinculo(prevStat => ({
                  ...prevStat,
                  typeVinculo: e.target.value
                }))}
              />
            </div>
          )}
        </div>
        {showSetor && (
          <div>
            <Input
              type="text"
              name="setor"
              text="Setor que trabalha"
              customClass="flex_1"
              handleOnChange={(e) => setVinculo(prevStat => ({
                ...prevStat,
                setor: e.target.value
              }))}
            />
          </div>
        )}
        <div style={{ marginBottom: "1em" }}>
          <CheckBox
            isSelected={comunidade === 'Sim'}
            side="right"
            name="community"
            value="Comunidade Externa"
            text="Comunidade Externa"
            customClass="bold"
            handleOnChange={(e) => setComunidade(e.target.checked ? 'Sim' : 'Não')}
          />
        </div>
        <div style={{ marginBottom: "1em" }} className={styles.flex}>
          <label htmlFor="work-Trabalha" className={styles.label}>
            Você trabalha?
          </label>
          <CheckBox
            isSelected={work.type === "Não trabalha"}
            side="right"
            value="Não trabalha"
            handleOnChange={(e) => setWork({
              type: e.target.value
            })}
            name="work"
            text="( ) Não"
          />
          <CheckBox
            isSelected={work.type === "Trabalha"}
            side="right"
            handleOnChange={(e) => setWork({
              type: e.target.value
            })}
            value="Trabalha"
            name="work"
            text="( ) Sim"
          />
        </div>
        {work.type === 'Trabalha' && (
          <div>
            <Input type="time" name="work_schedule" text="Trabalha em qual horário?" handleOnChange={(e) => setWork(prevStat => ({
              ...prevStat,
              hours: e.target.value
            }))} />
          </div>
        )}
        <div style={{ marginBottom: "1em" }} className={styles.flex}>
          <label htmlFor="psycho-Acompanha" className={styles.label}>
            Já realizou algum acompanhamento psicológico?
          </label>
          <div className={styles.flex}>
            <CheckBox
              isSelected={selectedPsycho === "Não acompanha"}
              side="right"
              value="Não acompanha"
              name="psycho"
              text="( ) Não"
              handleOnChange={handlePsychoChange}
            />
            <CheckBox
              isSelected={selectedPsycho === "Acompanha"}
              side="right"
              name="psycho"
              value="Acompanha"
              text="( ) Sim"
              handleOnChange={handlePsychoChange}
            />
          </div>
        </div>
        {showPsycho && (
          <div>
            <Input
              type="text"
              name="psycho_schedule"
              text="Por quanto tempo acompanhamento psicológico?"
              handleOnChange={handleChangePsycho}
            />
          </div>
        )}

        <div style={{ marginBottom: "1em" }} className={styles.flex}>
          <label htmlFor="psychiatric-Acompanha" className={styles.label}>
            Já realizou algum acompanhamento psiquiátrico?
          </label>
          <div className={styles.flex}>
            <CheckBox
              isSelected={selectedPsychi === "Não acompanha"}
              side="right"
              value="Não acompanha"
              name="psychiatric"
              text="( ) Não"
              handleOnChange={handlePsychiChange}
            />
            <CheckBox
              isSelected={selectedPsychi === "Acompanha"}
              side="right"
              value="Acompanha"
              name="psychiatric"
              text="( ) Sim"
              handleOnChange={handlePsychiChange}
            />
          </div>
        </div>
        {showPsychi && (
          <div>
            <Input
              type="text"
              name="psychiatric_schedule"
              text="Por quanto tempo fez acompanhamento psiquiátrico?"
              handleOnChange={handleChangePsychi}
            />
          </div>
        )}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="observation" className={styles.label}>
            Observações que considere importante:
          </label>
          <textarea name="observation" id="observation" rows="7" onChange={handleChange}></textarea>
        </div>
        <button onClick={showDate}>Enviar</button>
      </form>
    );
}

export default FichaForm