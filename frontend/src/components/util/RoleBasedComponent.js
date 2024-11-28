import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import Container from "../layout/Container"

const RoleBasedComponent = ({ allowedRoles, children }) => {
    const { userData } = useContext(UserContext)
    console.log(userData)

    if(allowedRoles.includes(userData.role)) 
        return <>{children}</>
    
    return <Container customClass="auto"><p>Não autorizado</p></Container>
}

export default RoleBasedComponent