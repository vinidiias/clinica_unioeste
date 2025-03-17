import { Box, Divider, TextField, Typography } from '@mui/material';
import Button from '../form/Button';
import Modal from '@mui/material/Modal';
import React, { useContext } from 'react';
import Table from '../form/Table';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import api from '../../services/Api';
import { UserContext } from '../context/UserContext';
import Input from '../form/Input';
import { useNavigate } from 'react-router-dom';

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

const AgendaFormModal = ({ open, handleClose, data }) => {
    const { userData } = useContext(UserContext)
    const navigate = useNavigate()
    const formMethods = useForm({
      defaultValues: data 
        ? { 
          ...data.ficha,
          ...data.user,
          ...data.pessoa
        } 
        : {}
    });

    const createScreening = async(date) => {
      console.log(date.date)
      try {
        await api.post(`/agendarConsulta/${data.ficha._id}/${userData.user_id}/${data.user._id}`, {agenda: date.date, horario: date.time}, {
          headers: { auth: userData.user_id}
        })
        .then((resp) => {
          console.log(resp)
          navigate('/psychologist/queue/screening')
        })
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
              <h1>Agendar Consulta</h1>
              <Divider />
            </div>
            <FormProvider {...formMethods}>
                <form style={{ display: 'flex', flexDirection: 'column', gap: 10 }} onSubmit={formMethods.handleSubmit(createScreening)}>
                    <h3
                      style={{
                        fontSize: "1em",
                        fontWeight: "300",
                      }}
                    >{`Paciente: ${data?.user?.name}`}</h3>
                    <Table title="Dias Disponíveis:" disabled={true} />{" "}
                    <div style={{ width: '100%'}}>
                        <h3
                          style={{
                            fontSize: "1em",
                            fontWeight: "300",
                            marginBottom: ".5em",
                          }}
                        >Data da Consulta</h3>
                       <Input
                       type='date'
                       name='date'
                      />
                      <h3
                          style={{
                            fontSize: "1em",
                            fontWeight: "300",
                            marginBottom: ".5em",
                          }}
                        >Horário da Consulta</h3>
                       <Input
                       type='time'
                       name='time'
                      />
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <Button text="Agendar Consulta" />
                    </div>
                </form>
            </FormProvider>
          </Box>
        </Modal>
      </React.Fragment>
    );
}

export default AgendaFormModal