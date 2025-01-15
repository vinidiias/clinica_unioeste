import styles from './index.module.css'
import api from '../../../services/Api'
import AuthForm from '../../auth/AuthForm'
import withAuth from '../../../hocs/withAuth'
import { UserContext } from '../../context/UserContext'
import { FormProvider, useForm } from 'react-hook-form'
import { useContext } from 'react'
import { convertToBase64 } from '../../util/ConvertToBase64'

const FirstAcessRegister = ({ onAction }) => {

    const { userData, setUserData }= useContext(UserContext)

    const formMethods = useForm()

    const fields = [
      {
        name: "photo",
        label: "Foto",
        type: "file",
      },
      {
        name: "sex",
        label: "Sexo",
        type: "select",
        options: ["Masculino", "Feminino"],
      },
      { name: "date", label: "Data de Nascimento", type: "date" },
      {
        name: "cpf",
        label: "CPF",
        type: "text",
        placeholder: "Digite seu CPF",
      },
      { name: "ra", label: "RA", type: "text", placeholder: "Digite seu RA" },
      {
        name: "phone",
        label: "Telefone",
        type: "text",
        placeholder: "Digite seu Telefone",
      },
      {
        name: "adress",
        label: "Endereço",
        type: "text",
        placeholder: "Digite seu Endereço",
      },
      {
        name: "number",
        label: "Número",
        type: "text",
        placeholder: "Digite seu Número de Endereço",
      },
    ];

    const btns = [
        { label: 'Confirmar', type: 'submit' },
    ]

    const handleRegister = async (data) => {
        try {
          data.photo = await convertToBase64(data.photo[0])
          console.log(data)
          const personCreated = await api.post(
            `/${userData.user_id}/pessoa`,
            data,
            {
              headers: { auth: `${userData.user_id}` },
            }
          );
          const newPessoa = personCreated.data.pessoa;
          console.log(newPessoa);

          let user = JSON.parse(sessionStorage.getItem("user"));
          user.isFirst = false;
          sessionStorage.setItem("user", JSON.stringify(user));

          setUserData((prevState) => ({
            ...prevState,
            isLogged: true,
          }));

          onClose();
          navigate("/home");
        } catch (err) {
          console.log(err);
        }
    }

    return (
      <div className={styles.overlay}>
        <FormProvider {...formMethods} >
          <form onSubmit={formMethods.handleSubmit((data) => onAction(() => handleRegister(data)))}>
            <AuthForm title="Preencha os dados" fields={fields} btns={btns} />
          </form>
        </FormProvider>
      </div>
    );
}

export default withAuth(FirstAcessRegister)

//<PersonalData customClass={customClass} onClose={onClose} />
