import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Contato = () => {
    const user = JSON.parse(sessionStorage.getItem('user'))
    const navigate = useNavigate()

    useEffect(() => {
        if(!user.isLogged){
            navigate('/')
        }
    }, [user, navigate])
    return (
        <h1>Contato</h1>
    )
}

export default Contato