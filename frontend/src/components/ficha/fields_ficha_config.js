const fieldsFicha = [
    {
     fields: [
       { name: 'profission', label: 'Profissão', type: 'text', placeholder: 'Digite sua profissão' }
     ]
    },
    {
     fields : [
       { name: 'level', label: 'Escolaridade', options: [ 'Fundamental I', 'Fundamental II', 'Ensino Médio', 'Ensino Técnico', 'Graduação', 'Pós-Graduação'], type: 'select' }
     ],
     child: [
       {
         dep: ['Pós Graduação', 'Graduação'],
         fields: [
           { name: 'curso', label: 'Curso', type: 'text', placeholder: 'Digite seu curso'},
           { name: 'periodo', label: 'Ano/Período', type: 'text', placeholder: 'Digite seu ano/período'},
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
       { name: 'vinculo_com_unioeste', label: 'Vínculo com Unioeste', type: 'select', options: ['Docente', 'Agente', 'Acadêmico', 'Estagiário', 'Sem Vínculo']},
     ],
     child: [
       {
         dep: ['Agente'],
         fields: [
           { name: 'setor', label: 'Setor que trabalha', type: 'text', placeholder: 'Digite o setor em que trabalha'}
         ]
       }
     ]
    },
    {
     fields: [
       { name: 'work', label: 'Você trabalha?', type: 'select', options: ['Sim', 'Não'] },
     ],
     child: [
       {
         dep: ['Sim'],
         fields: [
           { name: 'work_schedule', label: 'Trabalha em qual horário?', type: 'time'}
         ]
       }
     ]
    },
    {
     fields: [
       { name: 'psycho', label: 'Já realizou algum acompanhamento psicológico?', type: 'select', options: ['Sim', 'Não'] },
     ],
     child: [
       {
         dep: ['Sim'],
         fields: [
           { name: 'psycho_schedule', label: 'Por quanto tempo fez acompanhamento psicológico?', type: 'text'}
         ]
       }
     ]
    },
    {
     fields: [
       { name: 'psychiatric', label: 'Já realizou algum acompanhamento psiquiátrico?', type: 'select', options: ['Sim', 'Não'] },
     ],
     child: [
       {
         dep: ['Sim'],
         fields: [
           { name: 'psychiatric_schedule', label: 'Por quanto tempo fez acompanhamento psiquiátrico?', type: 'text'}
         ]
       }
     ]
    },
    {
     fields: [
       { name: 'observation', label: 'Observações que considere importante', rows: '7', type: 'textarea', placeholder: 'Digite alguma informação que possa considerar importante'}
     ]
    }
   ]

   export default fieldsFicha