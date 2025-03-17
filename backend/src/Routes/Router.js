const { Router } = require('express')

const userController = require('../Controller/UserController')
const SessionController = require('../Controller/SessionController')
const PessoaController = require('../Controller/PessoaController')
const FichaController = require('../Controller/FichaController')
const InvaitedController = require('../Controller/InvaitedController')
const ConsultaController = require('../Controller/ConsultaController')

const routes = Router()

//Usuarios
routes.post('/user', (req, res, next) => {
    req.body.role = 'paciente'
    next()
}, userController.create)
routes.get('/user', userController.index)
routes.patch('/user/:user_id', userController.updateUser)
routes.delete('/:user_id/user', userController.delete)

//Pessoas
routes.post('/:user_id/pessoa', PessoaController.create)
routes.get('/pessoas', PessoaController.indexAll)
routes.get('/:user_id/:pessoa_id/pessoa', PessoaController.indexByUser)
routes.patch('/pessoa/:user_id/:pessoa_id', PessoaController.updatePessoa)
routes.delete('/pessoas/delete', PessoaController.deleteAll)
routes.delete('/:user_id/pessoa/:pessoa_id', PessoaController.delete)

//Fichas
routes.post('/:user_id/ficha', FichaController.create)
routes.get('/ficharios', FichaController.indexAll)
routes.get('/:user_id/fichario/', FichaController.indexByUser)
routes.delete('/:user_id/:ficha/', FichaController.delete)
routes.delete('/ficharios/delete', FichaController.deleteAll)
routes.patch('/avaliarPrioridade/:ficha_id/:psico_id/:paci_id', FichaController.prioridadeFicha)


//Sessao
routes.post('/session', SessionController.create)

//Psicologo
routes.post('/psicologo/convite', InvaitedController.invited)
routes.post('/psicologo/validate', InvaitedController.validated)
routes.post('/psicologo/register', InvaitedController.register)

//Administrador
routes.post('/admin/convite', InvaitedController.invited)
routes.post('/admin/validate', InvaitedController.validated)
routes.post('/admin/register', InvaitedController.registerAdmin)

//Consultas
routes.post('/agendarConsulta/:ficha_id/:psico_id/:paci_id', ConsultaController.agendarTriagem)
routes.get('/consultaPsicologo/:psico_id', ConsultaController.indexByPsicologo);
routes.get('/consultasTraiagem/:psico_id', ConsultaController.indexPacientesEmTriagem);
routes.get('/consultaAvaliados/:psico_id', ConsultaController.indexPacientesAvaliados);
routes.post('/atualizarConsulta/:ficha_id/:psico_id/:paci_id', ConsultaController.createSemana);
routes.patch('/atualizaPrioridade/:ficha_id/:pscio_id/', ConsultaController.updatePrioridade);

module.exports = routes