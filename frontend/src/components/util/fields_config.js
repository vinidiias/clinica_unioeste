export const fieldsFicha = [
    {
     fields: [
       { name: 'profission', label: 'Profissão', type: 'text', placeholder: 'Digite sua profissão' },
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

export const personal_data_fields = [
  {
    fields: [
      { name: 'name', label: 'Nome', type: 'text', placeholder: 'Digite seu nome' },
      { name: 'birth', label: 'Data de Nascimento', type: 'date'},
      { name: 'sexo', label: 'Sexo', type: 'select', options: ['Masculino', 'Feminino'] },
    ]
   },
   {
    fields: [
      { name: 'phone', label: 'Telefone', type: 'text', placeholder: 'Digite seu Telefone' },
      { name: 'cpf', label: 'CPF', type: 'text', placeholder: 'Digite seu CPF'},
      { name: 'ra', label: 'RA', type: 'text',  placeholder: 'Digite seu RA' },
    ]
   },
   {
    fields: [
      { name: 'email', label: 'Email', type: 'email', placeholder: 'Digite seu Email' },
    ]
   },
]

export const table_ficha_fields = [
  { turno: 'Manhã', type: 'label', cell: [
    { name: "preferredDay.morning_monday", type: 'checkbox'},
    { name: "preferredDay.morning_tuesday", type: 'checkbox'},
    { name: "preferredDay.morning_wednesday", type: 'checkbox'},
    { name: "preferredDay.morning_thursday", type: 'checkbox'},
    { name: "preferredDay.morning_friday", type: 'checkbox'},
  ]},
  { turno: 'Tarde', type: 'label', cell: [
    { name: "preferredDay.afternoon_monday", type: 'checkbox'},
    { name: "preferredDay.afternoon_tuesday", type: 'checkbox'},
    { name: "preferredDay.afternoon_wednesday", type: 'checkbox'},
    { name: "preferredDay.afternoon_thursday", type: 'checkbox'},
    { name: "preferredDay.afternoon_friday", type: 'checkbox'},
  ]},
  { turno: 'Noite', type: 'label', cell: [
    { name: "preferredDay.night_monday", type: 'checkbox'},
    { name: "preferredDay.night_tuesday", type: 'checkbox'},
    { name: "preferredDay.night_wednesday", type: 'checkbox'},
    { name: "preferredDay.night_thursday", type: 'checkbox'},
    { name: "preferredDay.night_friday", type: 'checkbox'},
  ]},
]

export const table_consultation_fields = [
  { turno: 'Manhã', type: 'label', cell: [
    { name: "semana.Segunda-feira", type: 'checkbox'},
    { name: "semana.Terça-feira", type: 'checkbox'},
    { name: "semana.Quarta-feira", type: 'checkbox'},
    { name: "semana.Quinta-feira", type: 'checkbox'},
    { name: "semana.Sexta-feira", type: 'checkbox'},
  ]},
]

export const headsConsultation_table = [ 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta']


export const first_acess_fields = [
  {
    name: "img",
    label: "Foto",
    type: "file",
  },
  {
    name: "sexo",
    label: "Sexo",
    type: "select",
    options: ["Masculino", "Feminino"],
  },
  { name: "birth", label: "Data de Nascimento", type: "date" },
  {
    name: "cpf",
    label: "CPF",
    type: "text",
    placeholder: "Digite seu CPF",
  },
  { name: "ra", label: "RA", type: "text", placeholder: "Digite seu RA" },
  {
    name: "phone",
    label: "Telefone",
    type: "text",
    placeholder: "Digite seu Telefone",
  },
  {
    name: "addressComplet.address",
    label: "Endereço",
    type: "text",
    placeholder: "Digite seu Endereço",
  },
  {
    name: "addressComplet.number",
    label: "Número",
    type: "text",
    placeholder: "Digite seu Número de Endereço",
  },
]