import { useParams } from 'react-router-dom'
import styles from './ViewFicha.module.css'
import { useEffect, useState } from 'react'
import api from '../../services/Api'
import FichaForm from './FichaForm'
import Loading from '../layout/Loading'

const ViewFicha = () => { 
    const { id }= useParams()
    const [ficha, setFicha] = useState('')

    useEffect(() => {
        const getFicha = async () => {
          const fichaUser = await api.get(`${id}/fichario`, {headers: {auth: `${id}`}});

          if (fichaUser) {
            console.log(fichaUser.data);
            setFicha(fichaUser.data)
          }
        }

        getFicha()
    }, [])

    return (
      <>
        {ficha.length === 0 ? (
          <Loading />
        ) : (
          <>
            <h1> Ver ficha</h1>
            <FichaForm infoCompletPatient={ficha} />
          </>
        )}
      </>
    );
}

export default ViewFicha