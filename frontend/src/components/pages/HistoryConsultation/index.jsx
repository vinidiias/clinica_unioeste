import { Box, Divider, TextField, Typography } from "@mui/material"
import Input from "../../form/Input"
import AuthForm from "../../auth/AuthForm"
import { my_consultation_fields, fieldsFicha, table_consultation_fields, headsConsultation_table } from "../../util/fields_config"
import { FormProvider, useForm } from "react-hook-form"
import api from "../../../services/Api"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../context/UserContext"
import Table from "../../form/Table"

const buttonsFicha = [
    { label: 'Agendar Triagem', type: 'button', customClass: 'align' },
   ]

const HistoryConsultation = () => {
    const formMethods = useForm()
    const { userData } = useContext(UserContext)
    const [consultas, setConsultas] = useState([])

    useEffect(() => {
        const getConsult = async() => {
            try {
                await api.get(`/consultasPaciente/${userData.user_id}`, {
                    headers: { auth: userData.user_id}
                })
                .then(resp => {
                    console.log(resp)
                    formMethods.reset({
                        ...resp.data?.consultas[0],
                        semana: {
                            "Segunda-feira": resp.data?.consultas[0]?.semana?.includes("Segunda-feira") || false,
                            "Terça-feira": resp.data?.consultas[0]?.semana?.includes("Terça-feira") || false,
                            "Quarta-feira": resp.data?.consultas[0]?.semana?.includes("Quarta-feira") || false,
                            "Quinta-feira": resp.data?.consultas[0]?.semana?.includes("Quinta-feira") || false,
                            "Sexta-feira": resp.data?.consultas[0]?.semana?.includes("Sexta-feira") || false
                          },
                        ...resp.data.paciente
                    })
                    setConsultas(resp.data.consultas[0].semana)
                })
                .catch(err => console.error(err))
            } catch(err) {
                console.error(err)
            }
        }
        getConsult()
    }, [userData.user_id, formMethods])
console.log(consultas)
    return (
      <Box
        display="flex"
        flexDirection="column"
        width="100%"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        padding={3}
      >
        <Box
          flex={1}
          sx={{ backgroundColor: "#dcdcdc" }}
          borderRadius={2}
          padding={3}
          width="500px"
        >
          <div style={{ marginBottom: "1em" }}>
            <Typography textAlign="center" fontWeight="light" fontSize="1.5em">
              Sua Consulta
            </Typography>
            <Divider />
          </div>
          <FormProvider {...formMethods}>
            <Box display="flex" flexDirection="column" gap={3}>
              <div>
                <Typography
                  fontSize="1.2em"
                  marginBottom=".5em"
                  fontWeight="light"
                >
                  Nome do Paciente
                </Typography>
                <TextField
                  sx={{
                    fontSize: "1em",
                    fontWeight: "light",
                    backgroundColor: "white",
                  }}
                  size="small"
                  variant="outlined"
                  {...formMethods.register("name")}
                  fullWidth
                />
              </div>
              <div>
                <Typography
                  fontSize="1.2em"
                  marginBottom=".5em"
                  fontWeight="light"
                >
                  Nome da Psicólogo(a)
                </Typography>
                <TextField
                  sx={{
                    fontSize: "1em",
                    fontWeight: "light",
                    backgroundColor: "white",
                  }}
                  size="small"
                  variant="outlined"
                  {...formMethods.register("psicologo")}
                  fullWidth
                />
              </div>
              <Divider />
              <div>
                <Typography
                  fontSize="1.2em"
                  marginBottom=".5em"
                  fontWeight="light"
                >
                  Consulta
                </Typography>
                <div style={{ textAlign: "start" }}>
                  <Typography
                    fontSize="1.2em"
                    marginBottom=".5em"
                    fontWeight="light"
                  >
                    Dias da Semana:
                  </Typography>
                  <Table
                    fields={table_consultation_fields}
                    headsFields={headsConsultation_table}
                    disabled={true}
                  />
                  <div style={{ display: 'flex', alignItems: 'center', marginTop: '1em', gap: 10 }}>
                      <Typography
                        fontSize="1.2em"
                        fontWeight="light"
                      >
                        Horário das Consultas:
                      </Typography>
                      <TextField
                        sx={{
                          fontSize: "1em",
                          fontWeight: "light",
                        }}
                        size="small"
                        variant="standard"
                        
                        {...formMethods.register("horario")}
                      />
                  </div>
                </div>
              </div>
            </Box>
          </FormProvider>
        </Box>
      </Box>
    );
}

export default HistoryConsultation