import { Box, Divider, Modal, TextField } from "@mui/material";
import React, { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import MultipleSelect from "../form/MultipleSelect";
import Button from "../form/Button";
import api from "../../services/Api";
import { UserContext } from "../context/UserContext";

const style = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 5,
    gap: 2
  };


const ConsultationPerWeekModal = ({ open, handleClose, data}) => {
    const formMethods = useForm()
    console.log(data)
    const { userData }= useContext(UserContext)
    console.log(userData.user_id)
    const createConsultPerWeek = async(consultationData) => {
        try {
            await api.post(`/atualizarConsulta/${data.consultas[0]._id}/${userData.user_id}/${data.paciente.id}`, consultationData, {
                headers: { auth: userData.user_id }
            })
            .then(resp => console.log(resp))
            .catch(err => console.error(err))
        } catch(err) {
            console.error(err)
        }
    }

    return (
      <React.Fragment>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style, width: "auto" }}>
            <div>
              <h1>Definir Consultas</h1>
              <Divider />
              <FormProvider {...formMethods}>
                <form
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    marginTop: 12,
                  }}
                  onSubmit={formMethods.handleSubmit(createConsultPerWeek)}
                >
                  <h3
                    style={{
                      fontSize: "1em",
                      fontWeight: "300",
                    }}
                  >
                    Dias da Semana
                  </h3>
                  <MultipleSelect control={formMethods.control} name="semana" />
                  <h3
                    style={{
                      fontSize: "1em",
                      fontWeight: "300",
                      marginBottom: ".5em",
                    }}
                  >
                    Horário da Consulta
                  </h3>
                  <TextField type="time"  {...formMethods.register('time')} />
                  <Button type="submit" text="Definir Consulta" />
                </form>
              </FormProvider>
            </div>
          </Box>
        </Modal>
      </React.Fragment>
    );
}

export default ConsultationPerWeekModal