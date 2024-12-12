const Ficha = require('../Models/FichaModel');
const Psicologo = require('../Models/PsicologoModel');
const User = require('../Models/UserModel');

module.exports = {
    // Lista todas as fichas aguardando triagem
    async listarFichasEmAvaliacao(req, res) {
        try {
            const fichas = await Ficha.find({ status: 'Em avaliação' }).populate('user', 'nome email');
            return res.status(200).send(fichas);
        } catch (err) {
            return res.status(500).send({ message: 'Erro ao buscar fichas', error: err.message });
        }
    },

    // Avaliar ficha e definir prioridade
    async avaliarFicha(req, res) {
        const { ficha_id } = req.params;
        const { prioridade } = req.body; // 'Baixa', 'Média', 'Alta'
        const psicologoId = req.auth; // Assumindo que `auth` contém o ID do psicólogo autenticado

        if (!['Baixa', 'Média', 'Alta'].includes(prioridade)) {
            return res.status(400).send({ message: 'Prioridade inválida' });
        }

        try {
            const ficha = await Ficha.findById(ficha_id);

            if (!ficha) {
                return res.status(404).send({ message: 'Ficha não encontrada' });
            }

            ficha.prioridade = prioridade;
            ficha.psicologoId = psicologoId;
            ficha.status = 'Avaliada';

            await ficha.save();

            return res.status(200).send({ message: 'Ficha avaliada com sucesso', ficha });
        } catch (err) {
            return res.status(500).send({ message: 'Erro ao avaliar ficha', error: err.message });
        }
    },

    // Lista histórico de fichas avaliadas por um psicólogo
    async listarHistorico(req, res) {
        const psicologoId = req.auth; // Assumindo que `auth` contém o ID do psicólogo autenticado

        try {
            const fichas = await Ficha.find({ psicologoId, status: 'Avaliada' }).populate('user', 'nome email');
            return res.status(200).send(fichas);
        } catch (err) {
            return res.status(500).send({ message: 'Erro ao buscar histórico', error: err.message });
        }
    },
};
