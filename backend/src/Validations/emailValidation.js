const axios = require('axios')
require('dotenv').config()

function isValidEmailFormat (email){
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
}

async function verifyEmail (email) {
    if(!isValidEmailFormat(email)) return false    

    const url = `${process.env.URL_EMAIL}?email=${email}&api_key=${process.env.EMAIL_KEY}`;

    try{
        const response = await axios.get(url)
        return response.data.data.status === 'valid'
    }
    catch(err){
        //console.log(err)
        return false
    }
}

module.exports = { isValidEmailFormat, verifyEmail }