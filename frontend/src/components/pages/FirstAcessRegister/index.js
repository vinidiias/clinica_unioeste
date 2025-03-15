import styles from './index.module.css'
import api from '../../../services/Api'
import AuthForm from '../../auth/AuthForm'
import withAuth from '../../../hocs/withAuth'
import { UserContext } from '../../context/UserContext'
import { convertToBase64 } from '../../util/ConvertToBase64'
import { first_acess_fields } from '../../util/fields_config'

import { FormProvider, useForm } from 'react-hook-form'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const FirstAcessRegister = ({ onAction }) => {

    const { userData, setUserData }= useContext(UserContext)

    const navigate = useNavigate()

    useEffect(() => {
      if(!userData.isFirst) navigate('/home')
    }, [userData.isFirst, navigate])

    const formMethods = useForm()

    const btns = [
        { label: 'Confirmar', type: 'submit' },
    ]

    const handleRegister = async (data) => {
        try {
          data.img = await convertToBase64(data.img[0])
          await api.post(
            `/${userData.user_id}/pessoa`,
            data,
            {
              headers: { auth: `${userData.user_id}` },
            }
          );

          setUserData((prevState) => ({
            ...prevState,
            isFirst: false,
            isLogged: true,
          }));

          navigate("/home");
        } catch (err) {
          console.log(err);
        }
    }

    return (
      <div className={styles.overlay}>
        <FormProvider {...formMethods} >
          <form onSubmit={formMethods.handleSubmit((data) => onAction(() => handleRegister(data)))}>
            <AuthForm title="Preencha os dados" fields={first_acess_fields} btns={btns} />
          </form>
        </FormProvider>
      </div>
    );
}

export default withAuth(FirstAcessRegister)