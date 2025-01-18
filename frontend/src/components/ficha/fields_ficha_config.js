const fieldsFicha = [
    {
     fields: [
       { name: 'profission', label: 'Profissão', type: 'text', placeholder: 'Digite sua profissão' }
     ]
    },
    {
     fields : [
       { name: 'education.level', label: 'Escolaridade', options: [ 'Fundamental I', 'Fundamental II', 'Ensino Médio', 'Ensino Técnico', 'Graduação', 'Pós-Graduação'], type: 'select' }
     ],
     child: [
       {
         dep: ['Pós Graduação', 'Graduação'],
         fields: [
           { name: 'education.course', label: 'Curso', type: 'text', placeholder: 'Digite seu curso'},
           { name: 'education.period', label: 'Ano/Período', type: 'text', placeholder: 'Digite seu ano/período'},
           { name: 'education.shift', label: 'Turno do seu curso', type: 'select', options: ['Manhã', 'Tarde', 'Noite'] }
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
       { name: 'vinculo_unioeste.type', label: 'Vínculo com Unioeste', type: 'select', options: ['Docente', 'Agente', 'Acadêmico', 'Estagiário', 'Sem Vínculo']},
     ],
     child: [
       {
         dep: ['Agente'],
         fields: [
           { name: 'vinculo_unioeste.setor', label: 'Setor que trabalha', type: 'text', placeholder: 'Digite o setor em que trabalha'}
         ]
       }
     ]
    },
    {
      fields: [
        { name: 'community', label: 'Faz parte da comunidade ?', type: 'select', options: ['Sim', 'Não'] },
      ],
     },
    {
     fields: [
       { name: 'work.type', label: 'Você trabalha?', type: 'select', options: ['Sim', 'Não'] },
     ],
     child: [
       {
         dep: ['Sim'],
         fields: [
           { name: 'work.schedule', label: 'Trabalha em qual horário?', type: 'time'}
         ]
       }
     ]
    },
    {
     fields: [
       { name: 'psychologist.type', label: 'Já realizou algum acompanhamento psicológico?', type: 'select', options: ['Sim', 'Não'] },
     ],
     child: [
       {
         dep: ['Sim'],
         fields: [
           { name: 'psychologist.schedule', label: 'Por quanto tempo fez acompanhamento psicológico?', type: 'text'}
         ]
       }
     ]
    },
    {
     fields: [
       { name: 'psychiatric.type', label: 'Já realizou algum acompanhamento psiquiátrico?', type: 'select', options: ['Sim', 'Não'] },
     ],
     child: [
       {
         dep: ['Sim'],
         fields: [
           { name: 'psychiatric.schedule', label: 'Por quanto tempo fez acompanhamento psiquiátrico?', type: 'text'}
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