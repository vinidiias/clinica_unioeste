import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import Container from "../layout/Container"

const RoleBasedComponent = ({ allowedRoles, children }) => {
    const { userData } = useContext(UserContext)
    console.log(userData)

    if(allowedRoles.includes(userData.role)) 
        return <>{children}</>
    
    return null
}

export default RoleBasedComponent