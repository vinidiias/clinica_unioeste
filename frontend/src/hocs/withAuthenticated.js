import { useContext } from "react"
import { UserContext } from "../components/context/UserContext"
import { Navigate } from "react-router-dom"

const withAuthenticated = (Component) => {
    const AuthenticatedComponent = (props) => {
        const { userData } = useContext(UserContext)

        const isAuthenticated = userData.isLogged

        if(!isAuthenticated) {
            return <Navigate to="/login" />
        }
        
        return <Component {...props} />
    }

    return AuthenticatedComponent
}

export default withAuthenticated