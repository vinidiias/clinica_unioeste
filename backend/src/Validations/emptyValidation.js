function isEmpty (value){
    return !value || (typeof value === 'string' && value.trim() === '')
}

function UserEmpty(email, name, password){
    if(isEmpty(email)) return true

    if(isEmpty(name)) return true

    if(isEmpty(password)) return true

    return false
}

function PessoaEmpty(sexo, birth, cpf, ra, phone, addressComplet){
    if(isEmpty(sexo)) return true

    if(isEmpty(birth)) return true

    if(isEmpty(cpf)) return true

    if(isEmpty(ra)) return true

    if(isEmpty(phone)) return true

    if(isEmpty(addressComplet)) return true

    return false
}

function FicharioEmpty(profission, education, vinculo_unioeste, work, psychologist, psychiatric){
    console.log(vinculo_unioeste)
    if (!profission || profission.trim() === '') {
        console.log('profission: ', profission)
        return true
    }

    // Verifica os campos obrigatórios de education
    if (!education.level || education.level.trim() === '') {
        console.log('education type: ', education.type)
        return true
    }

    if(education.level === 'Graduação' || education.level === 'Pós Graduação') {
        if (!education || !education.course || education.course.trim() === '') {
            console.log('profissao course:',education.course)
            return true
        }
        if (!education.period || education.period.trim() === '') {
            console.log('education period:', education.period)
            return true
        }
        if (!education.shift || education.shift.trim() === '') {
            console.log('education shift: ', education.shift)
            return true
        }
    }

    // Verifica o campo obrigatório vinculo_unioeste
    if (!vinculo_unioeste || vinculo_unioeste.type.trim() === '') {
        console.log('vinculo_unioeste: ', vinculo_unioeste)
        return true
    }

    // Verifica os campos obrigatórios de work
    if (!work || !work.type || work.type.trim() === '') {
        console.log('work: ', work)
        return true
    }

    // Verifica os campos obrigatórios de psychologist
    if (!psychologist || !psychologist.type || psychologist.type.trim() === '') {
        console.log('psychologist: ', psychologist)
        return true
    }

    // Verifica os campos obrigatórios de psiquiatria
    if (!psychiatric || !psychiatric.type || psychiatric.type.trim() === '') {
        console.log('psychiatric: ', psiquiatria)
        return true
    }

    // Se todos os campos obrigatórios forem preenchidos, retorna true
    return false
}

module.exports = { UserEmpty, PessoaEmpty, FicharioEmpty }