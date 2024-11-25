import { createContext, useEffect, useState } from "react";

export const UserContext = createContext()

export function UserProvider(props) {
    const [userData, setUserData] = useState(() => {
        // Inicializar com dados do sessionStorage, se existirem
        const storedUser = sessionStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : {};
      });
      
    const [pessoa, setPessoa] = useState({
        img: '',
        age: '',
        sexo: '',
        birth: '',
        cpf: '',
        ra: '',
        phone: '',
        adressComplet: {
            adress: '',
            number: '',
        }
    })

    useEffect(() => {
        // Atualizar o sessionStorage sempre que userData mudar
        sessionStorage.setItem('user', JSON.stringify(userData));
      }, [userData]);

    return (
        <UserContext.Provider value={{userData, setUserData, pessoa, setPessoa}}>
            {props.children}
        </UserContext.Provider>
    )
}