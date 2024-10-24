import styles from './Profile.module.css'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

const Profile = () => {
    const [userData, setUserData] = useContext(UserContext)
    console.log(userData)

    return (
        <div>
            <h1>{userData.name}</h1>
        </div>
    )
}

export default Profile