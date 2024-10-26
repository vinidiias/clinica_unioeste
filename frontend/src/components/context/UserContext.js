import { createContext, useState } from "react";

export const UserContext = createContext()

export function UserProvider(props) {
    const [userData, setUserData] = useState({
        isLogged: false,
        name: '',
        email: '',
        user_id: '',
    })
    const [pessoa, setPessoa] = useState({
        img: '',
        name: '',
        age: '',
        birth: '',
        cpf: '',
        ra: '',
        phone: '',
        email: '',
        profissao: '',
        education: '',    
    })

    return (
        <UserContext.Provider value={{userData, setUserData, pessoa, setPessoa}}>
            {props.children}
        </UserContext.Provider>
    )
}