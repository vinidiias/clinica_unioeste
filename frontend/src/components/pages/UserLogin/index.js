import withStyleAuth from "../../../hocs/withStyleAuth";
import AuthForm from "../../auth/AuthForm";
import api from "../../../services/Api";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { UserContext } from "../../context/UserContext";
import withAuth from "../../../hocs/withAuth";
import FirstAcessRegister from "../FirstAcessRegister";

const UserLogin = ({ loading, onAction }) => {
  const { userData, setUserData } = useContext(UserContext);

  const [overlay, setOverlay] = useState(false);
  console.log("Componente UserLogin renderizado. Estado overlay:", overlay);

  const navigate = useNavigate();

  const handleNavigate = () => navigate("/register");

  const formMethods = useForm({
    defaultValues: {
      name: userData.name ? userData.name : "",
    },
  });

  useEffect(() => {
    console.log(overlay);
  }, [overlay]);

  const handleLogin = async (d) => {
    const email = d.email;
    const password = d.password;

    try {
      const userCreated = await api.post("/session", {
        email,
        password,
      });
      const data = userCreated.data;

      console.log(data);

      setUserData((prevState) => ({
        ...prevState,
        email: data.email,
        name: data.user,
        role: data.role,
        isFirst: true,
        user_id: data.user_id,
      }));

      if (data.firstLogin) {
        navigate('/login/first-acess')
      } else {
        setUserData((prevState) => ({
          ...prevState,
          isLogged: true,
        }));
        navigate("/home");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fields = [
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Digite seu email",
    },
    {
      name: "password",
      label: "Senha",
      type: "password",
      placeholder: "Digite sua senha",
    },
  ];

  const btns = [
    { label: "Entrar", type: "submit" },
    { label: "Criar conta", type: "button", handleClick: handleNavigate },
  ];

  const toggle = () => {
    setOverlay(!overlay);
  };

  return (
    <>
      <FormProvider {...formMethods}>
        <form
          onSubmit={formMethods.handleSubmit((data) => {
            onAction(() => handleLogin(data)); // Usando onAction para gerenciar o estado de loading
          })}
        >
          <AuthForm title="Entrar" fields={fields} btns={btns} />
        </form>
      </FormProvider>
    </>
  );
};

export default withAuth(withStyleAuth(UserLogin));
