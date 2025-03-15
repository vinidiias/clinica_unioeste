import { Box, Divider, TextField, Typography } from '@mui/material';
import Button from '../form/Button';
import Modal from '@mui/material/Modal';
import React from 'react';
import Table from '../form/Table';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

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

const AgendaFormModal = ({ open, handleClose, defaultValues }) => {
    console.log(defaultValues)
    const formMethods = useForm({ defaultValues })
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
                <form>
                    <h3
                      style={{
                        fontSize: "1em",
                        fontWeight: "300",
                      }}
                    >{`Paciente: ${defaultValues.name}`}</h3>
                    <Table title="Dias Disponíveis:" disabled={true} />{" "}
                    <div style={{ width: '100%'}}>
                        <h3
                          style={{
                            fontSize: "1em",
                            fontWeight: "300",
                            marginBottom: ".5em",
                          }}
                        >Data da Consulta</h3>
                        <TextField type="datetime-local" fullWidth name="date" size="small" />
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