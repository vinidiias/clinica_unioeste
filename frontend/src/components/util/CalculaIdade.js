export const calcularIdade = (dataNascimento) => {
    const [ano, mes, dia] = dataNascimento.split('-').map(Number)
    const nascimento = new Date(ano, mes-1, dia)
    const atual = new Date()

    let idade = atual.getFullYear() - nascimento.getFullYear()
    const mesAtual = atual.getMonth()
    const diaAtual = atual.getDate()

    const mesNascimento = nascimento.getMonth()
    const diaNascimento = nascimento.getDate()

    if( mesAtual < mesNascimento || (mesAtual === mesNascimento && diaAtual < diaNascimento)) {
        idade--
    }
    return idade
}