import { createContext, useState } from "react";

export const UserContext = createContext()

export function UserProvider(props) {
    const [userData, setUserData] = useState({
        isFirst: true,
        isLogged: false,
        name: '',
        email: '',
        user_id: '',
    })
    const [pessoa, setPessoa] = useState({
        img: '',
        name: '',
        age: '',
        sexo: '',
        birth: '',
        cpf: '',
        ra: '',
        email: '',
        phone: '',
        adressComplet: {
            adress: '',
            number: '',
        }
    })

    return (
        <UserContext.Provider value={{userData, setUserData, pessoa, setPessoa}}>
            {props.children}
        </UserContext.Provider>
    )
}