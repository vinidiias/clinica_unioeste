import FichaForm from "../FichaForm/FichaForm"
import styles from './ViewFicha.module.css'
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { FormProvider, useForm } from 'react-hook-form'

const CreateFicha = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const navigate = useNavigate();
  const formMethods = useForm()

  useEffect(() => {
    if (!user.isLogged) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleCreateFicha = (data) => {
    console.log(data)
  }

  const fieldsFicha = [
   {
    fields: [
      { name: 'profission', label: 'Profissão', type: 'text' }
    ]
   },
   {
    fields : [
      { name: 'level', label: 'Escolaridade', options: [ 'Fundamental I', 'Fundamental II', 'Ensino Médio', 'Ensino Técnico', 'Graduação', 'Pós-Graduação'] }
    ],
    child: [
      {
        dep: ['Pós Graduação', 'Graduação'],
        fields: [
          { name: 'curso', label: 'Curso', type: 'text'},
          { name: 'periodo', label: 'Ano/Período', type: 'text'},
          { name: 'course_schedule', label: 'Turno do seu curso', type: 'select', options: ['Manhã', 'Tarde', 'Noite'] }
        ]
      },
    ]
   },
   {
    fields: [
      { type: 'table'}
    ]
   },
   {
    fields: [
      { name: 'vinculo_com_unioeste', label: 'Vínculo com Unioeste', type: 'select', options: ['Docente', 'Agente', 'Acadêmico', 'Estagiário']},
    ],
    child: [
      {
        dep: ['Agente'],
        fields: [
          { name: 'setor', label: 'Setor que trabalha', type: 'text'}
        ]
      }
    ]
   },
   {
    fields: [
      { name: 'work', label: 'Você trabalha?', type: 'select', options: ['Trabalha', 'Não Trabalha'] },
    ],
    child: [
      {
        dep: ['Trabalha'],
        fields: [
          { name: 'work_schedule', label: 'Trabalha em qual horário?', type: 'time'}
        ]
      }
    ]
   },
   {
    fields: [
      { name: 'psycho', label: 'Já realizou algum acompanhamento psicológico?', type: 'select', options: ['Acompanha', 'Não Acompanha'] },
    ],
    child: [
      {
        dep: ['Acompanha'],
        fields: [
          { name: 'psycho_schedule', label: 'Por quanto tempo fez acompanhamento psicológico?', type: 'text'}
        ]
      }
    ]
   },
   {
    fields: [
      { name: 'psychiatric', label: 'Já realizou algum acompanhamento psiquiátrico?', type: 'select', options: ['Acompanha', 'Não Acompanha'] },
    ],
    child: [
      {
        dep: ['Acompanha'],
        fields: [
          { name: 'psychiatric_schedule', label: 'Por quanto tempo fez acompanhamento psiquiátrico?', type: 'text'}
        ]
      }
    ]
   },
   {
    fields: [
      { name: 'observation', label: 'Observações que considere importante', rows: '7', type: 'textarea'}
    ]
   }
  ]

  const buttonsFicha = [
    { label: 'Enviar', type: 'submit', customClass: 'align' },
  ]
  

  return (
      <FormProvider {...formMethods}>
          <form className={styles.ficha_form} onSubmit={formMethods.handleSubmit(handleCreateFicha)}>
            <FichaForm fieldsContainers={fieldsFicha} buttons={buttonsFicha} title="Preencha o fichário" />
          </form>
      </FormProvider>
  );
}

export default CreateFicha