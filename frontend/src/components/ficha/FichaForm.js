import { useEffect, useState } from 'react'
import styles from './FichaForm.module.css'
import Input from '../form/Input'
import CheckBox from '../form/CheckBox'
import Table from '../form/Table'
import Loading from '../layout/Loading'

const FichaForm = ({ pessoa }) => {
console.log(pessoa)
  const [name, setName] = useState(pessoa.name)
  const [age, setAge] = useState(pessoa.age)
  const [birth, setBirth] = useState(pessoa.birth)
  const [sex, setSex] = useState(pessoa.sexo)
  const [ra, setRa] = useState(pessoa.ra)
  const [cpf, setCpf] = useState(pessoa.cpf)
  const [phone, setPhone] = useState(pessoa.phone)
  const [email, setEmail] = useState(pessoa.email)
  const [adress, setAdress] = useState(pessoa.adressComplet.adress)
  const [number, setNumber] = useState(pessoa.adressComplet.number)
  const [profission, setProfission] = useState('')
  const [education, setEducation] = useState({
    type:'',
    curso: '',
    periodo: '',
    turno: '',
  })
  const [typeEducation, setTypeEducation] = useState('')
  const [curso, setCurso] = useState('')
  const [periodo, setPeriodo] = useState('')
  const [turno, setTurno] = useState('')
  const [preferredDay, setPreferredDay] = useState('')
  const [vinculo, setVinculo] = useState({
    type: '',
    typeVinculo: '',
    setor: '',
  })
  const [isVinculo, setIsVinculo] = useState(false)
  const [typeVinculo, setTypeVinculo] = useState('')
  const [setor, setSetor] = useState('')
  const [comunidade, setComunidade] = useState('')
  const [work, setWork] = useState({
    type: '',
    hours: '',
  })
  const [typeWork, setTypeWork] = useState('')
  const [horarioWork, setHorarioWork] = useState('')
  const [psicologa, setPsicologa] = useState({
    type: '',
    time: '',
  })
  const [typePsicologa, setTypePsicologa] = useState('')
  const [timePsicologa, setTimePsicologa] = useState('')
  const [psiquiatra, setPsiquiatra] = useState({
    type: '',
    time: '',
  })
  const [typePsiquiatra, setTypePsiquiatra] = useState('')
  const [timePsiquiatra, setTimePsiquiatra] = useState('')
  const [observation, setObservation] = useState('')

//education object
useEffect(() => {
  if (typeEducation !== 'Graduação' && typeEducation !== 'Pós Graduação') {
    setEducation({
      type: typeEducation, // Corrigido para 'type'
    });
  } else {
    setEducation({
      type:typeEducation, // Corrigido para 'type'
      curso:curso,
      periodo:periodo,
      turno:turno,
    });
  }
}, [typeEducation, curso, periodo, turno]);

  //vinculo unioeste object
  useEffect(() => {
    if(isVinculo){
      if(typeVinculo !== 'Agente') setVinculo(typeVinculo)
      else setVinculo({type:typeVinculo, setor:setor})
    }
    else setVinculo(isVinculo)
  }, [typeVinculo, setor, isVinculo])

  //work object
  useEffect(()=> {
    if(typeWork === 'Trabalha') setWork({type:typeWork, time:horarioWork})
    else setWork(typeWork)
  }, [typeWork, horarioWork])

  //psicologa object
  useEffect(() => {
    if(typePsicologa !== 'Acompanha')
      setPsicologa(typePsicologa)
    else setPsicologa({type:typePsicologa, time:timePsicologa})
  }, [typePsicologa, timePsicologa])

  //psiquiatra object
  useEffect(() => {
    if(typePsiquiatra !== 'Acompanha')
      setPsiquiatra(typePsiquiatra)
    else setPsiquiatra({type:typePsiquiatra, time:timePsiquiatra})
  }, [typePsiquiatra, timePsiquiatra])

  function submit(e){
    e.preventDefault()
    const fichaData = {
      name,
      age,
      birth,
      sex,
      ra,
      cpf,
      phone,
      email,
      adressComplet: {
        adress,
        number
      },
      profission,
      education,
      preferredDay,
      vinculo,
      comunidade,
      work,
      psicologa,
      psiquiatra,
      observation
    }
    console.log(fichaData)
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
      number: setNumber,
      profission: setProfission,
      observation: setObservation
    }

    if(setters[name]) {
      setters[name](value)
    }
  }

    return (
      <>
        <form className={styles.ficha_form}>
        <div className={styles.flex}>
            <Input
              type="text"
              handleOnChange={handleChange}
              name="name"
              text="Nome"
              disable={true}
              value={name}
              autoComplete="username"
              customClass="flex_1"
            />
            <Input
              type="text"
              handleOnChange={handleChange}
              name="age"
              text="Idade"
              disable={true}
              value={age}
            />
          </div>
          <div className={styles.flex}>
            <Input
              type="date"
              name="birth"
              text="Data de Nascimento"
              disable={true}
              value={birth}
              handleOnChange={handleChange}
            />
            <div className={styles.sex}>
              <label htmlFor="sex-F" className={styles.label}>
                Sexo:
              </label>
              <CheckBox
                side="right"
                isSelected={sex === "F"}
                disable={true}
                name="sex"
                value="F"
                text="( )F"
                handleOnChange={(e) => {
                  setSex(e.target.value);
                }}
                customClass="title"
              />
              <CheckBox
                side="right"
                isSelected={sex === "M"}
                disable={true}
                name="sex"
                value="M"
                text="( )M"
                handleOnChange={(e) => {
                  setSex(e.target.value);
                }}
              />
            </div>
          </div>
          <div className={styles.flex}>
            <Input
              type="text"
              name="ra"
              text="RA"
              value={ra}
              disable={true}
              handleOnChange={handleChange}
            />
            <Input
              type="text"
              name="cpf"
              text="CPF"
              value={cpf}
              disable={true}
              handleOnChange={handleChange}
            />
          </div>
          <div className={styles.flex}>
            <Input
              type="text"
              name="phone"
              text="Telefone ( )"
              value={phone}
              disable={true}
              autoComplete="tel"
              handleOnChange={handleChange}
            />
            <Input
              type="email"
              name="email"
              text="Email"
              value={email}
              disable={true}
              autoComplete="email"
              handleOnChange={handleChange}
            />
          </div>
          <div className={styles.flex}>
            <Input
              type="text"
              name="adress"
              text="Endereço"
              value={adress}
              disable={true}
              autoComplete="adress"
              handleOnChange={handleChange}
            />
            <Input
              type="text"
              name="number"
              text="Número"
              value={number}
              disable={true}
              handleOnChange={handleChange}
            />
          </div>
          <Input
            type="text"
            name="profission"
            text="Profissão"
            customClass="flex_1"
            handleOnChange={handleChange}
          />
          <div className={styles.flex}>
            <label htmlFor="level-Fundamental I" className={styles.label}>
              Escolaridade:
            </label>
            <div className={styles.student}>
              <CheckBox
                isSelected={education.type === "Fundamental I"}
                name="level"
                side="right"
                text="Fundamental I"
                value="Fundamental I"
                handleOnChange={(e) => setTypeEducation(e.target.value)}
              />
              <CheckBox
                isSelected={education.type === "Fundamental II"}
                side="right"
                name="level"
                text="Fundamental II"
                value="Fundamental II"
                handleOnChange={(e) => setTypeEducation(e.target.value)}
              />
              <CheckBox
                isSelected={education.type === "Ensino Médio"}
                side="right"
                name="level"
                text="Ensino Médio"
                value="Ensino Médio"
                handleOnChange={(e) => setTypeEducation(e.target.value)}
              />
              <CheckBox
                isSelected={education.type === "Ensino Técnico"}
                side="right"
                name="level"
                text="Ensino Técnico"
                value="Ensino Técnico"
                handleOnChange={(e) => setTypeEducation(e.target.value)}
              />
              <CheckBox
                isSelected={education.type === "Graduação"}
                side="right"
                name="level"
                text="Graduação"
                value="Graduação"
                handleOnChange={(e) => setTypeEducation(e.target.value)}
              />
              <CheckBox
                isSelected={education.type === "Pós Graduação"}
                side="right"
                name="level"
                text="Pós Graduação"
                value="Pós Graduação"
                handleOnChange={(e) => setTypeEducation(e.target.value)}
              />
            </div>
          </div>
          {(typeEducation === "Pós Graduação" ||
            typeEducation === "Graduação") && (
            <>
              <div className={styles.flex}>
                <Input
                  type="text"
                  name="curso"
                  text="Curso"
                  handleOnChange={(e) => setCurso(e.target.value)}
                />
                <Input
                  type="text"
                  name="periodo"
                  text="Ano/período"
                  handleOnChange={(e) => setPeriodo(e.target.value)}
                />
              </div>
              <div className={styles.flex}>
                <label htmlFor="curso" className={styles.label}>
                  Turno do seu curso:
                </label>
                <div className={styles.turnos}>
                  <CheckBox
                    isSelected={turno === "Manhã"}
                    side="right"
                    value="Manhã"
                    name="course_schedule"
                    text="Manhã"
                    handleOnChange={(e) => setTurno(e.target.value)}
                  />
                  <CheckBox
                    isSelected={turno === "Tarde"}
                    side="right"
                    value="Tarde"
                    name="course_schedule"
                    text="Tarde"
                    handleOnChange={(e) => setTurno(e.target.value)}
                  />
                  <CheckBox
                    isSelected={turno === "Noite"}
                    side="right"
                    value="Noite"
                    name="course_schedule"
                    text="Noite"
                    handleOnChange={(e) => setTurno(e.target.value)}
                  />
                </div>
              </div>
            </>
          )}
          <>
            <Table
              setPreferredDay={setPreferredDay}
              preferredDay={preferredDay}
            />
          </>
          <div className={styles.flex}>
            <CheckBox
              isSelected={isVinculo}
              customClass="bold"
              side="right"
              value="Vínculo com Unioeste"
              name="vinculo_com_unioeste"
              text="Vínculo com Unioeste:"
              handleOnChange={(e) => setIsVinculo(!isVinculo)}
            />
            {isVinculo && (
              <>
                <CheckBox
                  isSelected={typeVinculo === "Docente"}
                  side="right"
                  value="Docente"
                  name="vinculo_com_unioeste"
                  text="Docente"
                  handleOnChange={(e) => setTypeVinculo(e.target.value)}
                />
                <CheckBox
                  isSelected={typeVinculo === "Agente"}
                  side="right"
                  value="Agente"
                  name="type"
                  text="Agente"
                  handleOnChange={(e) => setTypeVinculo(e.target.value)}
                />
                <CheckBox
                  isSelected={typeVinculo === "Acadêmico"}
                  side="right"
                  value="Acadêmico"
                  name="vinculo_com_unioeste"
                  text="Acadêmico"
                  handleOnChange={(e) => setTypeVinculo(e.target.value)}
                />
                <CheckBox
                  isSelected={typeVinculo === "Estagiário"}
                  side="right"
                  value="Estagiário"
                  name="vinculo_com_unioeste"
                  text="Estagiário"
                  handleOnChange={(e) => setTypeVinculo(e.target.value)}
                />
              </>
            )}
          </div>
          {typeVinculo === "Agente" && (
            <>
              <Input
                type="text"
                name="setor"
                text="Setor que trabalha"
                customClass="flex_1"
                handleOnChange={(e) => setSetor(e.target.value)}
              />
            </>
          )}
          <div style={{ marginBottom: "1em" }}>
            <CheckBox
              isSelected={comunidade === "Sim"}
              side="right"
              name="community"
              value="Comunidade Externa"
              text="Comunidade Externa"
              customClass="bold"
              handleOnChange={(e) =>
                setComunidade(e.target.checked ? "Sim" : "Não")
              }
            />
          </div>
          <div className={styles.flex}>
            <label htmlFor="work-Trabalha" className={styles.label}>
              Você trabalha?
            </label>
            <div className={styles.acompanhamento}>
              <CheckBox
                isSelected={typeWork === "Não trabalha"}
                side="right"
                value="Não trabalha"
                name="work"
                text="( ) Não"
                handleOnChange={(e) => setTypeWork(e.target.value)}
              />
              <CheckBox
                isSelected={typeWork === "Trabalha"}
                side="right"
                handleOnChange={(e) => setTypeWork(e.target.value)}
                value="Trabalha"
                name="work"
                text="( ) Sim"
              />
            </div>
          </div>
          {work.type === "Trabalha" && (
            <>
              <Input
                type="time"
                name="work_schedule"
                text="Trabalha em qual horário?"
                handleOnChange={(e) => setHorarioWork(e.target.value)}
              />
            </>
          )}
          <div className={styles.flex}>
            <label htmlFor="psycho-Acompanha" className={styles.label}>
              Já realizou algum acompanhamento psicológico?
            </label>
            <div className={styles.acompanhamento}>
              <CheckBox
                isSelected={typePsicologa === "Não acompanha"}
                side="right"
                value="Não acompanha"
                name="psycho"
                text="( ) Não"
                handleOnChange={(e) => setTypePsicologa(e.target.value)}
              />
              <CheckBox
                isSelected={typePsicologa === "Acompanha"}
                side="right"
                name="psycho"
                value="Acompanha"
                text="( ) Sim"
                handleOnChange={(e) => setTypePsicologa(e.target.value)}
              />
            </div>
          </div>
          {typePsicologa === "Acompanha" && (
            <>
              <Input
                customClass="responsive"
                type="text"
                name="psycho_schedule"
                text="Por quanto tempo acompanhamento psicológico?"
                handleOnChange={(e) => setTimePsicologa(e.target.value)}
              />
            </>
          )}
          <div className={styles.flex}>
            <label htmlFor="psychiatric-Acompanha" className={styles.label}>
              Já realizou algum acompanhamento psiquiátrico?
            </label>
            <div className={styles.acompanhamento}>
              <CheckBox
                isSelected={typePsiquiatra === "Não acompanha"}
                side="right"
                value="Não acompanha"
                name="psychiatric"
                text="( ) Não"
                handleOnChange={(e) => setTypePsiquiatra(e.target.value)}
              />
              <CheckBox
                isSelected={typePsiquiatra === "Acompanha"}
                side="right"
                value="Acompanha"
                name="psychiatric"
                text="( ) Sim"
                handleOnChange={(e) => setTypePsiquiatra(e.target.value)}
              />
            </div>
          </div>
          {typePsiquiatra === "Acompanha" && (
            <>
              <Input
                customClass="responsive"
                type="text"
                name="psychiatric_schedule"
                text="Por quanto tempo fez acompanhamento psiquiátrico?"
                handleOnChange={(e) => setTimePsiquiatra(e.target.value)}
              />
            </>
          )}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="observation" className={styles.label}>
              Observações que considere importante:
            </label>
            <textarea
              name="observation"
              id="observation"
              rows="7"
              onChange={(e) => setObservation(e.target.value)}
            ></textarea>
          </div>
          <button className={styles.btnSubmit} onClick={submit}>
            Enviar
          </button>
        </form>
      </>
    );
}

export default FichaForm