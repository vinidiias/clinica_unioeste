import styles from "./index.module.css";
import Patient from "./Patient";
import { FaCaretSquareDown } from "react-icons/fa";
import React, { useState } from "react";
import { FixedSizeList as List } from "react-window";
import { useNavigate } from "react-router-dom";
import withLoading from "../../../hocs/withLoading";
import HeaderQueue from "./Header";
import ButtonsGroup from "./ButtonsGroup";

const WaitQueue = ({ data, isPriority }) => {
  const [isSelected, setIsSelected] = useState(null);
  const [over, setOver] = useState(false);
  const [fichas, setFichas] = useState(data || []);
  const navigate = useNavigate();

  function handleClick(index) {
    return isSelected === index ? setIsSelected(null) : setIsSelected(index);
  }

  const renderizarPaciente = ({ index }) => {
    const ficha = fichas[index];

    if(!isPriority) {
      if (!ficha.ficha.triagem) return null;
    } else {
      if (ficha.ficha.triagem) return null;
    }

    return (
      <div key={index}>
        <Patient
          img={ficha.pessoa.img}
          name={ficha.ficha.user.name}
          vinculo={ficha.ficha.vinculo_unioeste.type}
          indicado="Não"
          data="23/11/2024"
          isSelected={isSelected}
          index={index}
          setOver={setOver}
          over={over}
          handleClick={handleClick}
        />
      </div>
    );
  };

  const navigateToFichaByUser = () => {
    const id = fichas[isSelected].ficha.user._id;
    navigate(`/psychologist/screening/${id}`);
  };

  return (
    <>
      <div className={styles.screening}>
        <ButtonsGroup
          selected={isSelected}
          handleNavigate={navigateToFichaByUser}
        />
        <div className={styles.queue_container}>
          <HeaderQueue>
            <h3>ID</h3>
            <FaCaretSquareDown />
            <h3>Foto</h3>
            <h3>Nome</h3>
            <h3>Tipo</h3>
            <h3>Indicado</h3>
            <h3>Data</h3>
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

const WrappedWaitQueue = () => {
  const ScreeningWithLoading = withLoading(WaitQueue);

  return <ScreeningWithLoading url="/ficharios" />;
};

export default WrappedWaitQueue;
