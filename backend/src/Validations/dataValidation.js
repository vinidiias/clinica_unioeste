function isValidDateFormat(dataNascimento) {
    const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
    return regex.test(dataNascimento);
}

function isValidDate (dataNascimento){
    if(!isValidDateFormat(dataNascimento)) return false

    const [ano, mes, dia] = dataNascimento.split('-').map(Number)
    
    if (ano < 1900 || mes < 1 || mes > 12 || dia < 1 || dia > 31) return false

    if ([4, 6, 9, 11].includes(mes) && dia > 30) return false

    if (mes === 2) {
        const anoBisexto = (ano%4 === 0 && ano%100 !== 0) || ano%400 === 0
        if (dia > (anoBisexto ? 29 : 28)) return false
    }

    return true
}

function verifyDate (dataNascimento){
    if(!dataNascimento || !isValidDate(dataNascimento)) return false

    const birthDate = new Date(dataNascimento)
    if(dataNascimento && (isNaN(birthDate.getTime()) || birthDate > new Date())) return false

    return true
}

module.exports = { isValidDate, verifyDate }