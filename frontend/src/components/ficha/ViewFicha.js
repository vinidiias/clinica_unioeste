import { useParams } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import styles from './ViewFicha.module.css'
import withLoading from "../../hocs/withLoading";
import FichaForm from "./FichaForm";
import { fieldsFicha, personal_data_fields } from "../util/fields_config";
import AgendaFormModal from "../ui/AgendaFormModal";
import { useState } from "react";
import Button from "../form/Button";

const ViewFicha = ({ data, id }) => {
  console.log(data)
  const formMethods = useForm({defaultValues: data ? Object.assign(data.ficha, data.pessoa, data.user) : {}});
  const [openAgenda, setOpenAgenda] = useState(false)

  const buttonsFicha = [
    { label: 'Agendar Triagem', type: 'button', customClass: 'align', handleClick: () => setOpenAgenda(true) },
   ]

  const fields = personal_data_fields.concat(fieldsFicha)

  return (
    <>
      <FormProvider {...formMethods}>
        <div className={styles.ficha_form}>
          <FichaForm fieldsContainers={fields} buttons={buttonsFicha} disabled={true}
          />
        </div>
        <AgendaFormModal defaultValues={data ? Object.assign(data.ficha, data.user) : {}} open={openAgenda} handleClose={() => setOpenAgenda(false)} />
      </FormProvider>
    </>
  );
};

// Pegando o ID da URL e passando para o HOC
const WrappedViewFicha = () => {
  const { id } = useParams();
  const url = `${id}/fichario`;

  const EnhancedViewFicha = withLoading(ViewFicha);

  return <EnhancedViewFicha url={url} id={id} />;
};

export default WrappedViewFicha;
