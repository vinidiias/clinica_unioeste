const { ReturnDocument } = require('mongodb')
const User = require('../Models/User')
const bcrypt = require('bcrypt')

module.exports = {
    async create(req, res) {
        
        const { email, password } = req.body
       
        try{
            const userExists = await User.findOne({ email })
            if(!userExists) return res.status(400).send({ message: 'User does not exist' })
            //return res.status(200).send(userExists)

            const validPassword = await bcrypt.compare(password, userExists.password)
            if(!validPassword) return res.status(400).send('Password invelid')

            return res.status(200).send(userExists)
        }
        catch(err){
            return res.status(400).send(err)
        }
    }
}