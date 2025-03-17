import { Box, Divider, Modal } from "@mui/material";
import Button from "../form/Button";
import { FormProvider, useForm } from "react-hook-form";
import Select from '../form/Select'
import React, { useContext } from "react";
import Input from "../form/Input";
import { UserContext } from "../context/UserContext";
import api from "../../services/Api";
import { useNavigate } from "react-router-dom";

const style = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 6,
  px: 7,
  gap: 1,
};

const PriorityModal = ({ open, handleClose, data }) => {
  const formMethods = useForm();
  const { userData } = useContext(UserContext)
  const navigate = useNavigate()

  const createPriority = async (newData) => {
    try {
      await api.patch(`/avaliarPrioridade/${data?.ficha._id}/${userData.user_id}/${data?.paciente._id}`, newData, {
        headers: { auth: userData.user_id }
      })
      .then(resp => {
        navigate('/psychologist/queue/avaliation')
      })
      .catch(err => console.error(err))
    } catch (err) {
      console.err(err);
    }
  };

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
            <h1>Agendar Consulta</h1>
            <Divider />
          </div>
          <FormProvider {...formMethods}>
            <form
              style={{ display: "flex", flexDirection: "column", gap: 10 }}
              onSubmit={formMethods.handleSubmit(createPriority)}
            >
              <h3
                style={{
                  fontSize: "1em",
                  fontWeight: "300",
                }}
              >{`Paciente: ${data?.paciente?.name}`}</h3>
              <div>
                <h3
                  style={{
                    fontSize: "1em",
                    fontWeight: "300",
                    marginBottom: ".5em",
                  }}
                >
                  Prioridade:
                </h3>
                <Select
                  options={["Alta", "Baixa", "Média"]}
                  name="prioridade"
                />
                <h3
                  style={{
                    fontSize: "1em",
                    fontWeight: "300",
                    marginBottom: ".5em",
                  }}
                >
                  Data da Consulta:
                </h3>
                <Input name="agenda" type="date" />
                <h3
                  style={{
                    fontSize: "1em",
                    fontWeight: "300",
                    marginBottom: ".5em",
                  }}
                >
                  Horário da Consulta:
                </h3>
                <Input name="horario" type="time" />
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button text="Definir Prioridade" />
              </div>
            </form>
          </FormProvider>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default PriorityModal