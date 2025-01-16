import { useContext, useEffect, useState } from "react";
import styles from "./FichaForm.module.css";
import Input from "../form/Input";
import CheckBox from "../form/CheckBox";
import Table from "../form/Table";
import Loading from "../layout/Loading";
import Submit from "../form/Button";
import api from "../../services/Api";
import { calcularIdade } from "../util/CalculaIdade";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import TextArea from "../form/TextArea";
import Button from "../form/Button";
import Select from "../form/Select";
import { useFormContext } from "react-hook-form";

const FichaForm = ({
  infoCompletPatient,
  fieldsContainers,
  buttons,
  title,
}) => {
  const { userData } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { watch } = useFormContext()
  /*async function submit(e) {
    e.preventDefault();
    const fichaData = {
      profission,
      education,
      preferredDay,
      vinculo,
      comunidade,
      work,
      psicologa,
      psiquiatra,
      observation,
    };

    try {
      setLoading(true);
      const fichaCreated = await api.post(
        `${userData.user_id}/ficha`,
        fichaData,
        { headers: { auth: `${userData.user_id}` } }
      );

      if (fichaCreated) {
        console.log(fichaCreated);
        alert("Ficha criada com sucesso, espere ser atendido.");
        navigate("/home");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }*/


  return (
    <>
      <h1>{title}</h1>
      {fieldsContainers.map((container) => {
        return container.fields.map((field, index) => {
          switch (field.type) {
            case "text":
              return (
                <div className={styles.flex}>
                  <Input
                    key={index}
                    name={field.name}
                    text={field.label}
                    type={field.type}
                  />
                </div>
              );
            case "select":
              return (
                <>
                  <div className={styles.flex}>
                    <Select
                      key={index}
                      name={field.name}
                      text={field.label}
                      options={field.options}
                    />
                  </div>
                  {container.child[0].dep.map(dep => {
                    return dep === watch(field.name) (
                      container.child[0].fields.map((childField, index) => {
                        console.log(childField)
                        switch (childField.type) {
                          case "text":
                            return (
                              <div className={styles.flex}>
                                <Input
                                  key={index}
                                  name={childField.name}
                                  text={childField.label}
                                  type={childField.type}
                                />
                              </div>
                            );
                            case 'select':
                              return (
                                <div className={styles.flex}>
                                  <Select
                                    key={index}
                                    name={childField.name}
                                    text={childField.label}
                                    options={childField.options}
                                  />
                                </div>
                              )
                              default:
                                return null
                        }
                      })
                    )
                  })}
                </>
                
              );
            default:
              return null
          }
        });
      })}
    </>
  );
};

export default FichaForm;

/*  <>
      <h1>{title}</h1>
      {infoCompletPatient && (
        <>
          <div className={styles.flex}>
            <Input
              disabled={true}
              type="text"
              name="name"
              text="Nome"
            />
            <div className={styles.flex}>
              <Input
                disabled={true}
                type="date"
                name="birth"
                text="Data de Nascimento"
              />
            </div>
          </div>
          <div className={styles.flex}>
            <Input
              disabled={true}
              type="number"
              name="age"
              text="Idade"
            />
            <div className={styles.flex}>
              <Input
                disabled={true}
                type="text"
                name="phone"
                text="Telefone"
              />
            </div>
            {infoCompletPatient.pessoa.ra && (
              <div className={styles.flex}>
                <Input
                  disabled={true}
                  type="text"
                  name="ra"
                  text="RA"
                />
              </div>
            )}
          </div>
          <div className={styles.flex}>
            <Input
              disabled={true}
              type="text"
              name="adress"
              text="Endereço"
            />
            <div className={styles.flex}>
              <Input
                disabled={true}
                type="text"
                name="numberAdress"
                text="Número"
              />
            </div>
          </div>
        </>
      )}
      <div className={styles.flex}>
        <Input
          type="text"
          name="profission"
          text="Profissão"
          disabled={infoCompletPatient ? true : false}
        />
      </div>
      <div className={styles.flex}>
        <p className={styles.label}>Escolaridade *</p>
        <div className={styles.student}>
          <CheckBox
            disabled={!infoCompletPatient ? false : true}
            name="level"
            side="right"
            text="Fundamental I"
          />
          <CheckBox
            disabled={!infoCompletPatient ? false : true}
            side="right"
            name="level"
            text="Fundamental II"
          />
          <CheckBox
            disabled={!infoCompletPatient ? false : true}
            side="right"
            name="level"
            text="Ensino Médio"
          />
          <CheckBox
            disabled={!infoCompletPatient ? false : true}
            side="right"
            name="level"
            text="Ensino Técnico"
          />
          <CheckBox
            disabled={!infoCompletPatient ? false : true}
            side="right"
            name="level"
            text="Graduação"
          />
          <CheckBox
            disabled={!infoCompletPatient ? false : true}
            side="right"
            name="level"
            text="Pós Graduação"
          />
        </div>
      </div>
      {(typeEducation === "Pós Graduação" || typeEducation === "Graduação") &&(
        <>
          <div className={styles.flex}>
            <Input
              type="text"
              name="curso"
              text="Curso"
              disabled={infoCompletPatient ? true : false}
            />
            <Input
              type="text"
              name="periodo"
              text="Ano/período"
              disabled={infoCompletPatient ? true : false}
            />
          </div>
          <div className={styles.flex}>
            <p className={styles.label}>Turno do seu curso *</p>
            <div className={styles.turnos}>
              <CheckBox
                disabled={infoCompletPatient ? true : false}
                side="right"
                name="course_schedule"
                text="Manhã"
              />
              <CheckBox
                disabled={infoCompletPatient ? true : false}
                side="right"
                name="course_schedule"
                text="Tarde"
              />
              <CheckBox
                disabled={infoCompletPatient ? true : false}
                side="right"
                name="course_schedule"
                text="Noite"
              />
            </div>
          </div>
        </>
      )}
      <div className={styles.flex + " " + styles.table}>
        <Table
          viewPatientFicha={infoCompletPatient ? true : false}
        />
      </div>
      <div className={styles.flex}>
        <CheckBox
          side="left"
          name="vinculo_com_unioeste"
          text="Vínculo com Unioeste"
          disabled={infoCompletPatient ? true : false}
        />
        {isVinculo &&(
          <>
            <CheckBox
              side="right"
              name="vinculo_com_unioeste"
              text="Docente"
              disabled={infoCompletPatient ? true : false}
            />
            <CheckBox
              side="right"
              name="type"
              text="Agente"
              disabled={infoCompletPatient ? true : false}
            />
            <CheckBox
              side="right"
              name="vinculo_com_unioeste"
              text="Acadêmico"
              disabled={infoCompletPatient ? true : false}
            />
            <CheckBox
              side="right"
              name="vinculo_com_unioeste"
              text="Estagiário"
              disabled={infoCompletPatient ? true : false}
            />
          </>
        )}
      </div>
      {typeVinculo === "Agente" && isVinculo && (
        <>
          <Input
            type="text"
            name="setor"
            text="Setor que trabalha"
          />
        </>
      )}
      <div className={styles.flex}>
        <CheckBox
          side="left"
          name="community"
          text="Comunidade Externa"
          disabled={infoCompletPatient ? true : false}
        />
      </div>
      <div className={styles.flex}>
        <p className={styles.label}>Você trabalha? *</p>
        <div className={styles.acompanhamento}>
          <CheckBox
            side="right"
            name="work"
            text="Não"
            disabled={infoCompletPatient ? true : false}
          />
          <CheckBox
            side="right"
            name="work"
            disabled={infoCompletPatient ? true : false}
            text="Sim"
          />
        </div>
      </div>
      {work.type === "Trabalha" && (
        <div className={styles.flex}>
          <Input
            type="time"
            name="work_schedule"
            text="Trabalha em qual horário?"
            disabled={infoCompletPatient ? true : false}
          />
        </div>
      )}
      <div className={styles.flex}>
        <p className={styles.label}>
          Já realizou algum acompanhamento psicológico? *
        </p>
        <div className={styles.acompanhamento}>
          <CheckBox
            side="right"
            name="psycho"
            text="Não"
            disabled={infoCompletPatient ? true : false}
          />
          <CheckBox
            side="right"
            name="psycho"
            text="Sim"
            disabled={infoCompletPatient ? true : false}
          />
        </div>
      </div>
      {typePsicologa === "Acompanha" & (
        <div className={styles.flex}>
          <Input
            type="text"
            name="psycho_schedule"
            text="Por quanto tempo acompanhamento psicológico?"
            disabled={infoCompletPatient ? true : false}
          />
        </div>
      )}
      <div className={styles.flex}>
        <p className={styles.label}>
          Já realizou algum acompanhamento psiquiátrico? *
        </p>
        <div className={styles.acompanhamento}>
          <CheckBox
            side="right"
            name="psychiatric"
            text="Não"
            disabled={infoCompletPatient ? true : false}
          />
          <CheckBox
            side="right"
            name="psychiatric"
            text="Sim"
            disabled={infoCompletPatient ? true : false}
          />
        </div>
      </div>
      {typePsiquiatra === "Acompanha" && (
        <div className={styles.flex}>
          <Input
            customClass="responsive"
            type="text"
            name="psychiatric_schedule"
            text="Por quanto tempo fez acompanhamento psiquiátrico?"
            disabled={infoCompletPatient ? true : false}
          />
        </div>
      )}
      <div className={styles.flex}>
        <TextArea
          label="Observações que considere importante *"
          name="observation"
          disabled={infoCompletPatient ? true : false}
          rows="7"
        />
      </div>
      {!infoCompletPatient && <Button text="Enviar" type="submit" customClass="align" />}
    </>*/
