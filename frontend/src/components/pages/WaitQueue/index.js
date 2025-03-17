import styles from "./index.module.css";
import Patient from "./Patient";
import { FaCaretSquareDown } from "react-icons/fa";
import React, { useContext, useEffect, useState } from "react";
import { FixedSizeList as List } from "react-window";
import { useNavigate } from "react-router-dom";
import withLoading from "../../../hocs/withLoading";
import HeaderQueue from "./Header";
import ButtonsGroup from "./ButtonsGroup";
import { UserContext } from "../../context/UserContext";
import PriorityModal from "../../ui/PriorityModal";
import { Box, Tab, Tabs } from "@mui/material";
import PropTypes from "prop-types";
import ConsultationPerWeekModal from "../../ui/ConsultationPerWeekModal";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const WaitQueue = ({ data, status }) => {
  console.log(data)
  const [isSelected, setIsSelected] = useState(null);
  const [fichas, setFichas] = useState(
    (status === "Em Triagem"
      ? data
      : status === "Em avaliação"
      ? data?.consultas
      : data?.pacientesAvaliados) || []
  );
  const [over, setOver] = useState(false);
  const [open, setOpen] = useState(false);
  const [dataByUser, setDataByUser] = useState("");

  useEffect(() => {
    setDataByUser(fichas[isSelected]);
  }, [isSelected, fichas, dataByUser]);

  const navigate = useNavigate();
  function handleClick(index) {
    return isSelected === index ? setIsSelected(null) : setIsSelected(index);
  }

  const renderizarPaciente = ({ index }) => {
    const ficha = fichas[index];
    console.log(ficha)
    if (status === "Em Triagem") {
      if (!ficha.ficha.triagem || ficha.ficha.status !== "Em Triagem")
        return null;
    } else if (status === "Em avaliação") {
      if (!ficha.ficha.triagem || ficha.ficha.status !== "Em avaliação")
        return null;
    }

    return (
      <div key={index}>
        <Patient
          img={ficha.pessoa.img}
          name={ficha?.user?.name || ficha?.paciente?.name}
          vinculo={ficha?.ficha?.vinculo_unioeste?.type || `Nada`}
          prioridade={ficha?.ficha?.prioridade}
          date={ficha?.consulta?.agenda || "10/10/2025"}
          isSelected={isSelected}
          index={index}
          setOver={setOver}
          over={over}
          handleClick={handleClick}
          consultated={'Sim'}
        />
      </div>
    );
  };

  const navigateToFichaByUser = () => {
    const id = fichas[isSelected].user._id;
    console.log(id);
    navigate(`/psychologist/screening/${id}`);
  };

  const openModal = () => {
    setOpen(true);
  };

  return (
    <>
      <div className={styles.screening}>
        {status === "Em avaliação" && (
          <PriorityModal
            data={dataByUser}
            open={open}
            handleClose={() => setOpen(false)}
          />
        )}
        {status === "Avaliada" && (
          <ConsultationPerWeekModal
            data={dataByUser}
            open={open}
            handleClose={() => setOpen(false)}
          />
        )}
        <ButtonsGroup
          selected={isSelected}
          handleNavigate={
            status === "Em Triagem"
              ? navigateToFichaByUser
              : openModal
          }
          txt1={status === "Em Triagem" ? "Ver Fichário" : "Definir Prioridade"}
          txt2="Atualizar"
        />
        <div className={styles.queue_container}>
          <HeaderQueue>
            <h3>ID</h3>
            <FaCaretSquareDown />
            <h3>Foto</h3>
            <h3>Nome</h3>
            <h3>Tipo</h3>
            <h3>Prioridade</h3>
            <h3>Data</h3>
            <h3>Consultas Marcadas</h3>
          </HeaderQueue>
          <List
            height={window.innerHeight - 280} // Altura do container da lista (em pixels)
            itemCount={fichas.length} // Total de itens na lista
            itemSize={70} // Altura de cada item
            width="100%" // Largura da lista
          >
            {renderizarPaciente}
          </List>
        </div>
      </div>
    </>
  );
};

const WrappedWaitQueue = ({ status }) => {
  const ScreeningWithLoading = withLoading(WaitQueue);
  const { userData } = useContext(UserContext);
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{ marginTop: 1 }}
          centered
        >
          <Tab label="Triagem" {...a11yProps(0)} />
          <Tab label="Em Avaliação" {...a11yProps(1)} />
          <Tab label="Prioridade" {...a11yProps(2)} />
        </Tabs>
        <CustomTabPanel value={value} index={0}>
          <ScreeningWithLoading
            url="/ficharios"
            status="Em Triagem"
            id={userData.user_id}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <ScreeningWithLoading
            url={`/consultaPsicologo/${userData.user_id}`}
            status="Em avaliação"
            id={userData.user_id}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <ScreeningWithLoading
            url={`/consultaAvaliados/${userData.user_id}`}
            status="Avaliada"
            id={userData.user_id}
          />
        </CustomTabPanel>
      </Box>
    </Box>
  );
};

export default WrappedWaitQueue;
