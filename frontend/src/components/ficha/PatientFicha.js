import { useParams } from 'react-router-dom'
import styles from './PatientFicha.module.css'
import { useEffect, useState } from 'react'
import api from '../../services/Api'
import FichaForm from '../ficha/FichaForm'
import Loading from '../layout/Loading'

const PatientFicha = () => { 
    const { id }= useParams()
    const [ficha, setFicha] = useState('')

    useEffect(() => {
        const getFicha = async () => {
          const fichaUser = await api.get(`${id}/ficha`, {headers: {auth: `${id}`}});

          if (fichaUser) {
            console.log(fichaUser.data);
            setFicha(fichaUser.data)
          }
        }

        getFicha()
    }, [])

    return <>{ficha.length === 0 ? <Loading /> : (<FichaForm infoCompletPatient={ficha} />)}</>
}

export default PatientFicha