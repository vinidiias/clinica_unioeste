import FichaForm from "../ficha/FichaForm"
import styles from './Ficha.module.css'

import { UserContext } from "../context/UserContext"
import { useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import api from "../../services/Api"
import Loading from "../layout/Loading"
import { calcularIdade } from "../util/CalculaIdade"

const Ficha = () => {
    const user = JSON.parse(sessionStorage.getItem('user'))
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

                if(dataPessoa) {
                    const data = dataPessoa.data[0]

                    const dataUser = {
                        name: user.name,
                        email: user.email
                    }

                    Object.assign(data, dataUser)
                    data.age = calcularIdade(data.birth)
                    setPessoa(data)
                }
            } catch(err) {
                console.log(err)
            }
        }

        getPessoa()
    }, [user])

    return (
      <>
        {Object.keys(pessoa).length === 0 ? (
          <Loading />
        ) : (
          <FichaForm pessoa={pessoa} />
        )}
      </>
    );
   
}

export default Ficha