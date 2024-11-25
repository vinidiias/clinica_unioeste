function isValidPhoneNumber(phone) {
    const regex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/ // Formato (XX)XXXXX-XXXX ou XXXXXXXXXX
    return regex.test(phone)
}

module.exports = { isValidPhoneNumber }