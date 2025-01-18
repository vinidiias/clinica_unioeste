import { useParams } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import styles from './ViewFicha.module.css'
import withLoading from "../../hocs/withLoading";
import FichaForm from "./FichaForm";
import { fieldsFicha, personal_data_fields } from "../util/fields_config";

const ViewFicha = ({ data }) => {
  const formMethods = useForm({defaultValues: data ? data.ficha : {}});

  const buttonsFicha = [
    { label: 'Enviar', type: 'submit', customClass: 'align' },
  ]

  const fields = personal_data_fields.concat(fieldsFicha)

  return (
    <>
      <FormProvider {...formMethods}>
        <form className={styles.ficha_form}>
          <FichaForm fieldsContainers={fields} buttons={buttonsFicha} disabled={true}
          />
        </form>
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
