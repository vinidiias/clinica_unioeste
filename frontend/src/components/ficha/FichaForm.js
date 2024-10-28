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
    type: '',
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

  function handleChangeCurso(e) {
    setFichaForm({
      ...fichaForm,
      education: {
        ...fichaForm.education, // Preserva os campos existentes
        [e.target.name]: e.target.value // Atualiza apenas o campo correspondente ao input alterado
      }
    });
  }

  function handleChangePsycho(e) {
    setFichaForm({...fichaForm,
      psychological: {
        ...fichaForm.psychological,
        [e.target.name]: e.target.value
      }
    })
  }

  function handleChangePsychi(e) {
    setFichaForm({...fichaForm,
      psychiatric: {
        ...fichaForm.psychiatric,
        [e.target.name]: e.target.value
      }
    })
  }

  function handleChangeSetor(e) {
    setFichaForm({
      ...fichaForm,
      vinculo_com_unioeste: {
        ...fichaForm.vinculo_com_unioeste,
        [e.target.name]: e.target.value
      }
    })
  }

  function handlePsychiChange(value, e) {
    const newPsychi = selectedPsychi === value ? null : value

    setSelectedPsychi(newPsychi)
    handleShowPsychi(newPsychi)

    setFichaForm({...fichaForm,
      psychiatric: {
        ...fichaForm.psychiatric,
        type: e.target.checked ? value : null
      }
    })
  }

  function handleShowPsychi(currentPsychi){
    if(currentPsychi === 'Acompanha') setShowPsychi(true)
      else setShowPsychi(false)
  }

  function handleShowPsycho(currentPsycho) {
    if(currentPsycho === 'Acompanha') setShowPsycho(true)
    else setShowPsycho(false)
  }

  function handlePsychoChange(value, e) {
    const newPsycho = selectedPsycho === value ? null : value

    setSelectedPsycho(newPsycho)
    handleShowPsycho(newPsycho)

    setFichaForm({...fichaForm,
      psychological: {
        ...fichaForm.psychological,
        type: e.target.checked ? value : null
      }
    })
  }

  function handleSchoolChange(value, e) {
    const newSchool = selectedSchool === value ? null : value;
    setSelectedSchool(newSchool);

    handleSetShowCurso(newSchool);

    setFichaForm({...fichaForm , education: {
      [e.target.name]: e.target.checked ? value : null
    }
  })}

function handleUniversityChange(value, e) {
  const newSchool = selectedSchool === value ? null : value;
  setSelectedSchool(newSchool);

  handleSetShowCurso(newSchool);

  setFichaForm({...fichaForm , education: {
    [e.target.name]: e.target.checked ? value : null
  }
})
}

function handleTurnoChange(value, e) {
  const newTurno = selectedTurno === value ? null : value;
  setSelectedTurno(newTurno)

  setFichaForm({...fichaForm, education:{
    ...fichaForm.education,
    [e.target.name]: e.target.checked ? value : null
  }})
}

function handleShowWork(currentWork) {
  if(currentWork === 'Trabalha') setShowWork(true)
  else setShowWork(false)
}

function handleWorkChange(value, e) {
  const newWork = selectedWork === value ? null : value

  setSelectedWork(newWork)
  handleShowWork(newWork)

  setFichaForm({
    ...fichaForm,
    work: {
      ...fichaForm.work,
      type: e.target.checked ? value : null
    }
  });
}

function handleChangeTimeWork(e) {
  setFichaForm({
    ...fichaForm,
    work: {
      ...fichaForm.work,
      [e.target.name]: e.target.value
    }
  });
}

  function handleCommunityChange(value, e) {
    const newCommunity = selectedCommunity === value ? null : value

    setSelectedCommunity(newCommunity)

    setFichaForm({
      ...fichaForm,
      [e.target.name]: e.target.checked ? true : null
    })
  }

  function handleSexoChange(value, e) {
    setSelectedSexo(selectedSexo === value ? null : value);
  
    // Atualiza a ficha com base no valor e se o checkbox está marcado
    setFichaForm({
      ...fichaForm,
      [e.target.name]: e.target.checked ? value : null
    })
  }

  function handleVinculoChange(value, e) {
    const newVinculo = selectedVinculo === value ? null : value;
    setSelectedVinculo(newVinculo)
    handleSetShowTypeVinculo(newVinculo)
    setFichaForm({
      ...fichaForm,
      [e.target.name]: e.target.checked ? selectedTypeVinculo : null
    })
  }

  function handleTypeVinculoChange(value, e) {
    const newtTypeVinculo = selectedTypeVinculo === value ? null : value;

    setSelectedTypeVinculo(newtTypeVinculo)
    handleSetShowSetor(newtTypeVinculo)
    
    if(value === 'Agente'){
      setFichaForm({
        ...fichaForm,
        vinculo_com_unioeste:{
          [e.target.name]: e.target.checked ? value : null
        }
      })
    } else {
      setFichaForm({
        ...fichaForm,
        [e.target.name]: e.target.checked ? value : null
      })
    }

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
              isSelected={selectedSexo === "F"}
              name="sexo"
              value="F"
              text="( )F"
              handleOnChange={handleSexoChange}
              customClass="title"
            />
            <CheckBox
              side="right"
              isSelected={selectedSexo === "M"}
              name="sexo"
              value="M"
              text="( )M"
              handleOnChange={handleSexoChange}
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
              isSelected={selectedSchool === "Fundamental I"}
              name="level"
              side="right"
              text="Fundamental I"
              value="Fundamental I"
              handleOnChange={handleSchoolChange}
            />
            <CheckBox
              isSelected={selectedSchool === "Fundamental II"}
              side="right"
              name="level"
              text="Fundamental II"
              value="Fundamental II"
              handleOnChange={handleSchoolChange}
            />
            <CheckBox
              isSelected={selectedSchool === "Ensino Médio"}
              side="right"
              name="level"
              text="Ensino Médio"
              value="Ensino Médio"
              handleOnChange={handleSchoolChange}
            />
            <CheckBox
              isSelected={selectedSchool === "Ensino Técnico"}
              side="right"
              name="level"
              text="Ensino Técnico"
              value="Ensino Técnico"
              handleOnChange={handleSchoolChange}
            />
            <CheckBox
              isSelected={selectedSchool === "Graduação"}
              side="right"
              name="level"
              text="Graduação"
              value="Graduação"
              handleOnChange={handleUniversityChange}
            />
            <CheckBox
              isSelected={selectedSchool === "Pós Graduação"}
              side="right"
              name="level"
              text="Pós Graduação"
              value="Pós Graduação"
              handleOnChange={handleUniversityChange}
            />
            {showCurso && (
              <div style={{ marginTop: "1em" }}>
                <div className={styles.flex}>
                  <Input type="text" name="curso" text="Curso" handleOnChange={handleChangeCurso} />
                  <Input type="text" name="periodo" text="Ano/período" handleOnChange={handleChangeCurso} />
                </div>
                <div className={styles.flex}>
                  <label htmlFor="curso" className={styles.label}>
                    Turno do seu curso:
                  </label>
                  <CheckBox
                    isSelected={selectedTurno === "Manhã"}
                    side="right"
                    value="Manhã"
                    name="course_schedule"
                    text="Manhã"
                    handleOnChange={handleTurnoChange}
                  />
                  <CheckBox
                    isSelected={selectedTurno === "Tarde"}
                    side="right"
                    value="Tarde"
                    name="course_schedule"
                    text="Tarde"
                    handleOnChange={handleTurnoChange}
                  />
                  <CheckBox
                    isSelected={selectedTurno === "Noite"}
                    side="right"
                    value="Noite"
                    name="course_schedule"
                    text="Noite"
                    handleOnChange={handleTurnoChange}
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
            isSelected={selectedVinculo === "Vínculo com Unioeste"}
            customClass="bold"
            side="right"
            value="Vínculo com Unioeste"
            name="vinculo_com_unioeste"
            text="Vínculo com Unioeste:"
            handleOnChange={handleVinculoChange}
          />
          {showTypeVinculo && (
            <div className={styles.flex}>
              <CheckBox
                isSelected={selectedTypeVinculo === "Docente"}
                side="right"
                value="Docente"
                name="vinculo_com_unioeste"
                text="Docente"
                handleOnChange={handleTypeVinculoChange}
              />
              <CheckBox
                isSelected={selectedTypeVinculo === "Agente"}
                side="right"
                value="Agente"
                name="type"
                text="Agente"
                handleOnChange={handleTypeVinculoChange}
              />
              <CheckBox
                isSelected={selectedTypeVinculo === "Acadêmico"}
                side="right"
                value="Acadêmico"
                name="vinculo_com_unioeste"
                text="Acadêmico"
                handleOnChange={handleTypeVinculoChange}
              />
              <CheckBox
                isSelected={selectedTypeVinculo === "Estagiário"}
                side="right"
                value="Estagiário"
                name="vinculo_com_unioeste"
                text="Estagiário"
                handleOnChange={handleTypeVinculoChange}
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
              handleOnChange={handleChangeSetor}
            />
          </div>
        )}
        <div style={{ marginBottom: "1em" }}>
          <CheckBox
            isSelected={selectedCommunity === "Comunidade Externa"}
            side="right"
            name="community"
            value="Comunidade Externa"
            text="Comunidade Externa"
            customClass="bold"
            handleOnChange={handleCommunityChange}
          />
        </div>
        <div style={{ marginBottom: "1em" }} className={styles.flex}>
          <label htmlFor="work-Trabalha" className={styles.label}>
            Você trabalha?
          </label>
          <CheckBox
            isSelected={selectedWork === "Não trabalha"}
            side="right"
            value="Não trabalha"
            handleOnChange={handleWorkChange}
            name="work"
            text="( ) Não"
          />
          <CheckBox
            isSelected={selectedWork === "Trabalha"}
            side="right"
            handleOnChange={handleWorkChange}
            value="Trabalha"
            name="work"
            text="( ) Sim"
          />
        </div>
        {showWork && (
          <div>
            <Input type="time" name="work_schedule" text="Trabalha em qual horário?" handleOnChange={handleChangeTimeWork} />
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