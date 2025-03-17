import { FormProvider, useForm } from "react-hook-form";
import AuthForm from "../../auth/AuthForm"
import withStyleAuth from "../../../hocs/withStyleAuth";
import withAuth from "../../../hocs/withAuth";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../../../services/Api";

const fields = [
  {
    name: "name",
    label: "Nome",
    type: "text",
    placeholder: "Digite seu nome",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Digite seu email",
    disable: true
  },
  {
    name: "password",
    label: "Senha",
    type: "password",
    placeholder: "Digite sua senha",
  },
];

  const btn = [
    { label: "Ativar Conta", type: "submit" },
  ];

const PsyRegister = () => {
    const formMethods = useForm()
    const [searchParams] = useSearchParams()
    const [isValid, setIsValid] = useState(false)
    const [message, setMessage] = useState('')
    const { setValue } = formMethods

    useEffect(() => {
          const getSearchUrl = async () => {
            const email = searchParams.get("email");
            const id = searchParams.get("id");
            console.log(email)
    
            if (email && id) {
              api
                .post(`/psicologo/validate`, { email, id })
                .then(() => setValue("email", String(email)))
                .then(() => setIsValid(true))
                .catch(() => setMessage("Convite inválido"));
            } else {
              setMessage("Informações ausente de convite");
            }
          };
          getSearchUrl();
    })

    const submit = async(data) => {
        try {
            const id = searchParams.get("id");
            const response = await api.post('/psicologo/register', {...data, id})

            if(response) {
                alert('Conta criada com sucesso!')
            }
        } catch(err) {
            console.error(err)
        }
    }

    return (
      <Box width="100%">
        {isValid ? (
          <FormProvider {...formMethods}>
            <form onSubmit={formMethods.handleSubmit(submit)}>
              <AuthForm title="Ativar Conta" fields={fields} btns={btn} />
            </form>
          </FormProvider>
        ) : (
          <p style={{ textAlign: "center" }}>{message}</p>
        )}
      </Box>
    );
}

export default withAuth(withStyleAuth(PsyRegister));