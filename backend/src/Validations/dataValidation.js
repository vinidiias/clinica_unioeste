function calcularIdade (dataNascimento){
    const nascimento = new Date(dataNascimento)
    const atual = new Date()

    let idade = atual.getFullYear - nascimento.getFullYear
    const mesAtual = atual.getMonth
    const diaAtual = atual.getDay

    const mesNascimento = nascimento.getMonth
    const diaNascimento = nascimento.getDay

    if( mesAtual < mesNascimento || (mesAtual === mesNascimento && diaAtual < diaNascimento)) {
        idade--
    }
    return idade

}

module.exports = { calcularIdade }