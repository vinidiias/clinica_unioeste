import styles from "./index.module.css";
import { useContext } from "react";
import PersonalData from "./PersonalData";
import Escolaridade from "./Education";
import Adress from "./Adress";
import { calcularIdade } from "../../util/CalculaIdade";
import { UserContext } from "../../context/UserContext";
import withAuthenticated from "../../../hocs/withAuthenticated";
import withLoading from "../../../hocs/withLoading";

const Profile = ({ data }) => {
  const { userData } = useContext(UserContext);

  return (
    <div className={styles.profile}>
      <PersonalData
        initialData={
          {
            ...data,
            name: userData.name,
            email: userData.email,
            age: calcularIdade(data ? data.birth : ""),
          } || {}
        }
      />
      <Adress />
      <Escolaridade />
    </div>
  );
};

const WrappedProfile = () => {
  const { userData } = useContext(UserContext);
  const url = `/${userData.user_id}/pessoa`;

  const WithFetching = withLoading(Profile);

  return <WithFetching url={url} id={userData.user_id} />;
};

export default withAuthenticated(WrappedProfile);
