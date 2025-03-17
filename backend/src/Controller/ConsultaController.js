const Ficha = require('../Models/FichaModel');
const User = require('../Models/UserModel');
const Consulta = require('../Models/ConsultaModel'); 
const Pessoa = require('../Models/PessoaModel'); // Importa o modelo de pessoa

module.exports = {

    async agendarTriagem(req, res) {
        const { ficha_id, psico_id, paci_id } = req.params;
        const { agenda, horario } = req.body;
        const { auth } = req.headers;
    
        try {
            const psico = await User.findById(psico_id);
            if (!psico) return res.status(400).send({ message: 'Psicólogo não encontrado' });
            if (psico.role !== 'psicologo') return res.status(400).send({ message: 'Somente psicólogos podem agendar a triagem' });
    
            const paciente = await User.findById(paci_id);
            if (!paciente) return res.status(400).send({ message: 'Paciente não encontrado' });
            if (paciente.role !== 'paciente') return res.status(400).send({ message: 'O ID fornecido não pertence a um paciente' });
    
            if (psico_id !== auth) return res.status(403).send({ message: 'Não autorizado' });
    
            const ficha = await Ficha.findById(ficha_id);
            if (!ficha) return res.status(400).send({ message: 'Ficha não encontrada' });

            // console.log(ficha.user._id)
            // console.log(paci_id)
    
            if (ficha.user.toString() !== paci_id) return res.status(400).send({ message: 'Ficha não pertence ao paciente informado' });
            
    
            const consultaExistente = await Consulta.findOne({
                paciente_id: paci_id,
                psicologo_id: psico_id
            });
    
            if (consultaExistente) return res.status(400).send({ message: 'Este paciente já tem uma triagem agendada com este psicólogo' });
            
    
            // Cria a consulta
            const createConsulta = await Consulta.create({
                agenda,
                horario,
                psicologo_id: psico_id,
                paciente_id: paci_id
            });
    
            ficha.status = 'Em avaliação';
            await ficha.save();
    
            return res.status(201).send({
                message: 'Triagem agendada com sucesso',
                consulta: createConsulta,
                ficha
            });

        } catch (err) {
            return res.status(400).send({
                message: 'Erro ao agendar paciente para triagem.',
                error: err.message
            });
        }
    },

    async indexByPsicologo (req, res) {
        const { psico_id } = req.params;
        const { auth } = req.headers;
    
        try {
            // 🔹 Verifica se o psicólogo existe e tem permissão
            const psico = await User.findById(psico_id);
            if (!psico) return res.status(400).send({ message: 'Psicólogo não encontrado' });
            if (psico.role !== 'psicologo') return res.status(400).send({ message: 'Somente psicólogos podem acessar esta rota' });
            if (psico_id !== auth) return res.status(403).send({ message: 'Não autorizado' });
    
            // 🔹 Busca todas as consultas do psicólogo
            const consultas = await Consulta.find({ psicologo_id: psico_id });
    
            if (!consultas || consultas.length === 0) {
                return res.status(404).send({ message: 'Nenhuma consulta encontrada para este psicólogo' });
            }
    
            // 🔹 Enriquecendo cada consulta com os dados completos do paciente, pessoa e ficha
            const consultasComPacientes = await Promise.all(
                consultas.map(async (consulta) => {
                    const paciente = await User.findById(consulta.paciente_id).select('name email role');
                    const pessoa = await Pessoa.findOne({ user: consulta.paciente_id });
                    const ficha = await Ficha.findOne({ user: consulta.paciente_id });
    
                    return {
                        agenda: consulta.agenda,
                        horario: consulta.horario,
                        paciente,
                        pessoa,
                        ficha
                    };
                })
            );
    
            return res.status(200).send({
                psicologo: { name: psico.name, email: psico.email },
                consultas: consultasComPacientes
            });
    
        } catch (err) {
            console.error("Erro ao listar consultas do psicólogo:", err);
            return res.status(500).send({
                message: 'Erro ao listar consultas do psicólogo',
                error: err.message
            });
        }
    },

    async  indexPacientesEmTriagem(req, res) {
        const { psico_id } = req.params;
        const { auth } = req.headers;
    
        try {
            // Verifica se o usuário autenticado é o psicólogo correspondente
            if (psico_id !== auth) {
                return res.status(403).send({ message: 'Não autorizado' });
            }
    
            // Verifica se o psicólogo existe
            const psicologo = await User.findById(psico_id);
            if (!psicologo) return res.status(404).send({ message: 'Psicólogo não encontrado' });
            if (psicologo.role !== 'psicologo') return res.status(400).send({ message: 'Apenas psicólogos podem acessar essa lista' });
    
            // Busca todas as fichas de pacientes que estão em triagem
            const fichasTriagem = await Ficha.find({ triagem: true }).populate('user', 'name email');
    
            if (!fichasTriagem || fichasTriagem.length === 0) {
                return res.status(404).send({ message: 'Nenhum paciente em triagem' });
            }
    
            // Enriquecendo com os dados pessoais do paciente (Pessoa)
            const pacientesComDados = await Promise.all(
                fichasTriagem.map(async (ficha) => {
                    const pessoa = await Pessoa.findOne({ user: ficha.user._id });
                    return {
                        ficha,
                        pessoa
                    };
                })
            );
    
            return res.status(200).send({
                psicologo: psicologo.name,
                pacientesEmTriagem: pacientesComDados
            });
    
        } catch (err) {
            return res.status(500).send({
                message: 'Erro ao listar pacientes em triagem',
                error: err.message
            });
        }
    },
    
    async indexPacientesAvaliados(req, res) {
        const { psico_id } = req.params;
        const { auth } = req.headers;
    
        try {
   
            if (psico_id !== auth) {
                return res.status(403).send({ message: 'Não autorizado' });
            }
    

            const psicologo = await User.findById(psico_id);
            if (!psicologo) return res.status(404).send({ message: 'Psicólogo não encontrado' });
            if (psicologo.role !== 'psicologo') return res.status(400).send({ message: 'Apenas psicólogos podem acessar essa lista' });
    
     
            const fichasAvaliadas = await Ficha.find({ status: "Avaliada" }).populate('user', 'name email');
    
            if (!fichasAvaliadas || fichasAvaliadas.length === 0) {
                return res.status(404).send({ message: 'Nenhum paciente avaliado encontrado' });
            }
    

            const pacientesComDados = await Promise.all(
                fichasAvaliadas.map(async (ficha) => {
                    const pessoa = await Pessoa.findOne({ user: ficha.user._id });
    
  
                    const consultas = await Consulta.find({ 
                        paciente_id: ficha.user._id, 
                        psicologo_id: psico_id 
                    }).select('agenda semana horario');
    
                    return {
                        paciente: {
                            id: ficha.user._id,  
                            name: ficha.user.name, 
                            email: ficha.user.email
                        },
                        ficha: {
                            id: ficha._id,  
                            status: ficha.status,
                            prioridade: ficha.prioridade
                        },
                        pessoa,
                        consultas
                    };
                })
            );
    
            return res.status(200).send({
                psicologo: {
                    id: psicologo._id,
                    name: psicologo.name,
                    email: psicologo.email
                },
                pacientesAvaliados: pacientesComDados
            });
    
        } catch (err) {
            console.error("Erro ao listar pacientes avaliados:", err);
            return res.status(500).send({
                message: 'Erro ao listar pacientes avaliados',
                error: err.message
            });
        }
    },
    

    async indexByPaciente(req, res) {
        const { paci_id } = req.params;
        const { auth } = req.headers;
    
        try {
            // Verifica se o paciente autenticado está acessando suas próprias consultas
            if (paci_id !== auth) {
                return res.status(403).send({ message: 'Não autorizado' });
            }
    
            // Verifica se o paciente existe
            const paciente = await User.findById(paci_id);
            if (!paciente) return res.status(404).send({ message: 'Paciente não encontrado' });
            if (paciente.role !== 'paciente') return res.status(400).send({ message: 'Somente pacientes podem acessar essa consulta' });
    
            // Busca todas as consultas onde `paciente_id` seja igual ao `paci_id`
            const consultas = await Consulta.find({ paciente_id: paci_id });
    
            if (!consultas || consultas.length === 0) {
                return res.status(404).send({ message: 'Nenhuma consulta encontrada para este paciente' });
            }
    
            // Enriquecendo cada consulta com apenas o nome do psicólogo responsável
            const consultasComNomePsicologo = await Promise.all(
                consultas.map(async (consulta) => {
                    const psicologo = await User.findById(consulta.psicologo_id).select('name'); // Retorna apenas o nome
                    return {
                        consulta,
                        psicologo: psicologo ? psicologo.name : 'Psicólogo não encontrado'
                    };
                })
            );
    
            return res.status(200).send({
                paciente: paciente.name,
                consultas: consultasComNomePsicologo
            });
        } catch (err) {
            return res.status(500).send({
                message: 'Erro ao listar consultas do paciente',
                error: err.message
            });
        }
    },

    async indexAll (req, res) {
        try{
            const allConsultas = await Consulta.find()
            .populate('psicologo_id', 'name email role')
            .populate('paciente_id', 'name email role');

            return res.status(200).send(allConsultas)
        }
        catch(err){
            return res.status(400).send({
                message: 'Erro ao listar consultas',
                error: err.message
            })
        }
    },

    async createSemana(req, res) {
        const { consulta_id, psico_id, paci_id } = req.params;
        const { horario, semana } = req.body; // Agora recebe `semana` como array
        const { auth } = req.headers; // ID do usuário autenticado
    
        try {
            const psico = await User.findById(psico_id);
            if (!psico) return res.status(400).send({ message: 'Psicólogo não encontrado' });
    
            const paciente = await User.findById(paci_id);
            if (!paciente) return res.status(400).send({ message: 'Paciente não encontrado' });
    
            if (paciente.role !== 'paciente') return res.status(400).send({ message: 'O ID fornecido não pertence a um paciente' });
            if (psico.role !== 'psicologo') return res.status(400).send({ message: 'Somente psicólogos podem acessar esta consulta' });
    
            const consulta = await Consulta.findById(consulta_id);
            if (!consulta) return res.status(404).send({ message: 'Consulta não encontrada' });
    
            if (psico_id !== auth) {
                return res.status(403).send({ message: 'Somente o psicólogo responsável pode atualizar esta consulta' });
            }
    
            if (horario) consulta.horario = horario;
    
            if (!consulta.semana) {
                consulta.semana = [];
            }
    
            if (Array.isArray(semana) && semana.length > 0) {
                consulta.semana = [...new Set([...consulta.semana, ...semana])]; // Remove duplicatas e adiciona os novos valores
            }
    
            await consulta.save();
    
            const consultaCompleta = await Consulta.findById(consulta._id)
                .populate('psicologo_id', 'name email')
                .populate('paciente_id', 'name email');
    
            return res.status(200).send({
                message: 'Consulta atualizada com sucesso',
                consulta: consultaCompleta
            });
    
        } catch (err) {
            console.error("Erro ao atualizar consulta:", err);
            return res.status(500).send({
                message: 'Erro ao atualizar consulta',
                error: err.message
            });
        }
    },
    

    async updatePrioridade(req, res) {
        const { ficha_id, psico_id } = req.params;
        const { prioridade } = req.body;
        const { auth } = req.headers;
    
        try {
            // 🔹 Verifica se o psicólogo está autenticado e autorizado
            if (psico_id !== auth) {
                return res.status(403).send({ message: 'Não autorizado' });
            }
    
            // 🔹 Verifica se o psicólogo existe
            const psicologo = await User.findById(psico_id);
            if (!psicologo) return res.status(404).send({ message: 'Psicólogo não encontrado' });
            if (psicologo.role !== 'psicologo') return res.status(400).send({ message: 'Apenas psicólogos podem atualizar a prioridade' });
    
            // 🔹 Verifica se a ficha existe
            const ficha = await Ficha.findById(ficha_id).populate('user', 'name email role');
            if (!ficha) return res.status(404).send({ message: 'Ficha não encontrada' });
    
            // 🔹 Verifica se a ficha pertence a um paciente
            if (ficha.user.role !== 'paciente') {
                return res.status(400).send({ message: 'A ficha informada não pertence a um paciente' });
            }
    
            // 🔹 Valida a prioridade
            const prioridadesValidas = ['Baixa', 'Média', 'Alta'];
            if (!prioridadesValidas.includes(prioridade)) {
                return res.status(400).send({ message: 'Prioridade inválida. As opções são: Baixa, Média ou Alta' });
            }
    
            // 🔹 Atualiza a prioridade
            ficha.prioridade = prioridade;
            await ficha.save();
    
            return res.status(200).send({
                message: 'Prioridade atualizada com sucesso',
                ficha
            });
    
        } catch (err) {
            console.error("Erro ao atualizar prioridade:", err);
            return res.status(500).send({
                message: 'Erro ao atualizar prioridade',
                error: err.message
            });
        }
    }
    
};
