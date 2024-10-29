import FichaForm from "../ficha/FichaForm"

import { UserContext } from "../context/UserContext"
import { useNavigate } from "react-router-dom"
import { useContext, useEffect } from "react"

const Ficha = () => {
    const {userData} = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(() => {
        if(!userData.isLogged){
            navigate('/')
        }
    }, [userData, navigate])

    return (
        <FichaForm />
    )
}

export default Ficha