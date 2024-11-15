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

function FicharioEmpty(profession, education, vinculo, work, psicologa, psiquiatria){
    if (!profession || profession.trim() === '') return true

    // Verifica os campos obrigatórios de education
    if (!education || !education.curso || education.curso.trim() === '') return true
    if (!education.periodo || education.periodo.trim() === '') return true
    if (!education.turno || education.turno.trim() === '') return true
    if (!education.nivel || education.nivel.trim() === '') return true

    // Verifica o campo obrigatório vinculo
    if (!vinculo || vinculo.trim() === '') return true

    // Verifica os campos obrigatórios de work
    if (!work || !work.type || work.type.trim() === '') return true

    // Verifica os campos obrigatórios de psicologa
    if (!psicologa || !psicologa.type || psicologa.type.trim() === '') return true

    // Verifica os campos obrigatórios de psiquiatria
    if (!psiquiatria || !psiquiatria.type || psiquiatria.type.trim() === '') return true

    // Se todos os campos obrigatórios forem preenchidos, retorna true
    return false

}

module.exports = { UserEmpty, PessoaEmpty, FicharioEmpty }