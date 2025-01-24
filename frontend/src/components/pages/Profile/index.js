import styles from "./index.module.css";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../layout/Loading";
import PersonalData from "./PersonalData";
import Escolaridade from "./Education";
import Adress from "./Adress";
import api from "../../../services/Api";
import { calcularIdade } from "../../util/CalculaIdade";
import { UserContext } from "../../context/UserContext";
import { first_acess_fields } from "../../util/fields_config";

import withAuthenticated from "../../../hocs/withAuthenticated";
import { FormProvider, useForm } from "react-hook-form";
import withLoading from "../../../hocs/withLoading";

const Profile = ({ data }) => {
  const { userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();
  const [pessoa, setPessoa] = useState({});

  const methodsForm = useForm({
    defaultValues: data ?  {
      name: userData.name,
      email: userData.email,
      birth: data.birth || "",
      cpf: data.cpf || "",
      phone: data.phone || "",
      ra: data.ra || "",
      sexo: data.sexo || "",
      age: calcularIdade(data.birth)
    } : {}
  });

  return (
    <div className={styles.profile}>
      <FormProvider {...methodsForm}>
        <form>
          <PersonalData imgProfile={data?.img} />
          <Adress />
          <Escolaridade />
        </form>
      </FormProvider>
    </div>
  );
};

const WrappedProfile = () => {
  const { userData } = useContext(UserContext);
  const url = `/${userData.user_id}/pessoa`; 

  const WithFetching = withLoading(Profile);

  return <WithFetching url={url} id={userData.user_id} />;
};

export default WrappedProfile;
