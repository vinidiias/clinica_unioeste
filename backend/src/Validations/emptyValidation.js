function isEmpty (value){
    return !value || (typeof value === 'string' && value.trim() === '')
}

function UserEmpty(email, name, password){
    if(isEmpty(email)) return true

    if(isEmpty(name)) return true

    if(isEmpty(password)) return true

    return false
}

function PessoaEmpty(sexo, birth, cpf, ra, phone, adressComplet){
    if(isEmpty(sexo)) return true

    if(isEmpty(birth)) return true

    if(isEmpty(cpf)) return true

    if(isEmpty(ra)) return true

    if(isEmpty(phone)) return true

    if(isEmpty(adressComplet)) return true

    return false
}

function FicharioEmpty(profession, education, vinculo, work, psicologa, psiquiatra){
    console.log(vinculo)
    if (!profession || profession.trim() === '') {
        console.log('profession: ', profession)
        return true
    }

    // Verifica os campos obrigatórios de education
    if (!education.type || education.type.trim() === '') {
        console.log('education type: ', education.type)
        return true
    }

    if(education.type === 'Graduação' || education.type === 'Pós Graduação') {
        if (!education || !education.curso || education.curso.trim() === '') {
            console.log('profissao curso:',education.curso)
            return true
        }
        if (!education.periodo || education.periodo.trim() === '') {
            console.log('education periodo:', education.periodo)
            return true
        }
        if (!education.turno || education.turno.trim() === '') {
            console.log('education turno: ', education.turno)
            return true
        }
    }

    // Verifica o campo obrigatório vinculo
    if (!vinculo || vinculo.type.trim() === '') {
        console.log('vinculo: ', vinculo)
        return true
    }

    // Verifica os campos obrigatórios de work
    if (!work || !work.type || work.type.trim() === '') {
        console.log('work: ', work)
        return true
    }

    // Verifica os campos obrigatórios de psicologa
    if (!psicologa || !psicologa.type || psicologa.type.trim() === '') {
        console.log('psicologa: ', psicologa)
        return true
    }

    // Verifica os campos obrigatórios de psiquiatria
    if (!psiquiatra || !psiquiatra.type || psiquiatra.type.trim() === '') {
        console.log('psiquiatra: ', psiquiatria)
        return true
    }

    // Se todos os campos obrigatórios forem preenchidos, retorna true
    return false
}

module.exports = { UserEmpty, PessoaEmpty, FicharioEmpty }