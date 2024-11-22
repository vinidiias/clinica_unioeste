import FichaForm from "../ficha/FichaForm"
import styles from './Ficha.module.css'

import { UserContext } from "../context/UserContext"
import { useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import api from "../../services/Api"

const Ficha = () => {
    const user = JSON.parse(sessionStorage.getItem('user'))
    console.log(user)
    const navigate = useNavigate()
    const [pessoa, setPessoa] = useState({})

    useEffect(() => {
        if(!user.isLogged){
            navigate('/')
        }
    }, [user, navigate])

    useEffect(() => {
        const getPessoa = async () => {
            try {
                const dataPessoa = await api.get(`/${user.user_id}/pessoa`,
                    {headers: {auth: `${user.user_id}`}}
                )
                
                const dataUser = {
                    name: user.name,
                    email: user.email
                }

                Object.assign(dataPessoa.data[0], dataUser)
                console.log(dataPessoa.data[0])
                setPessoa(dataPessoa.data[0])
            } catch(err) {
                console.log(err)
            }
        }

        getPessoa()
    }, [])

    return <FichaForm pessoa={pessoa} />;
}

export default Ficha