import styles from "./index.module.css";
import Input from "../../form/Input";
import Button from "../../form/Button";
import Select from "../../form/Select";
import api from "../../../services/Api";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useLocation, useSearchParams } from "react-router-dom";

const AuthForm = ({
  title,
  fields,
  btns,
  handleSubmit,
  handleRegister,
  handleClick,
}) => {
  const { userData } = useContext(UserContext);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [searchParams] = useSearchParams();
  const [register, setRegister] = useState(false);
  const [message, setMessage] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const location = useLocation();

  useEffect(() => {
    if (userData.email) {
      setEmail(userData.email);
    }
  }, [userData.email]);

  useEffect(() => {
    if (location.pathname === "/register") {
      setRegister(true);
    } else setRegister(false);
  }, [location]);

  useEffect(() => {
    if (register) {
      const getSearchUrl = async () => {
        const email = searchParams.get("email");
        const id = searchParams.get("id");

        if (email && id) {
          api
            .post(`/admin/validate`, { email, id })
            .then(() => setEmail(email))
            .then(() => setIsValid(true))
            .catch(() => setMessage("Convite inválido"));
        } else {
          setMessage("Informações ausente de convite");
        }
      };
      getSearchUrl();
    }
  }, [searchParams, register]);

  const registerSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Senhas não coincidem");
      return;
    }

    const email = searchParams.get("email");
    const id = searchParams.get("id");

    handleRegister(email, name, password, id);
  };

  const submit = (e) => {
    e.preventDefault();

    handleSubmit(email, password);
  };

  return (
    <>
      {fields.length > 0 &&
        fields.map((field, index) => {
          switch (field.type) {
            case "email":
              return (
                <Input
                  key={index}
                  type={field.type}
                  name={field.name}
                  text={field.label}
                  placeholder={field.placeholder}
                  customClass="column padding_login"
                />
              );
              break;
            case "password":
              return (
                <Input
                  key={index}
                  type={field.type}
                  name={field.name}
                  text={field.label}
                  placeholder={field.placeholder}
                  customClass="column padding_login"
                />
              );
              break;
            case "text":
              return (
                <Input
                  key={index}
                  type={field.type}
                  name={field.name}
                  text={field.label}
                  placeholder={field.placeholder}
                  customClass="column padding_login"
                />
              );
              break;
            case "file":
              return (
                <Input
                  key={index}
                  type={field.type}
                  name={field.name}
                  text={field.label}
                  customClass="padding_login"
                />
              );
              break;
            case "select":
              return (
                <Select
                  key={index}
                  name={field.name}
                  text={field.label}
                  options={field.options}
                />
              );
              break;
            case "date":
              return (
                <Input
                  key={index}
                  type={field.type}
                  name={field.name}
                  text={field.label}
                  customClass="column padding_login"
                />
              );
              break;
            default:
              return null;
          }
        })}
    </>
  );
};

export default AuthForm;

/**
 <form
      onSubmit={!register ? submit : registerSubmit}
    >
      {!register ? (
        <>
          <Input
            type="email"
            name="email-overlay"
            text="Email"
            value={email}
            placeholder="Digite seu email"
            customClass="column padding_login"
            handleOnChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            name="password"
            text="Senha"
            placeholder="Digite sua senha"
            customClass="column padding_login"
            handleOnChange={(e) => setPassword(e.target.value)}
          />
        </>
      ) : isValid ? (
        <>
          <Input
            type="email"
            name="email-overlay"
            text="Email"
            disable={true}
            value={email}
            placeholder="Digite seu email"
            customClass="column padding_login"
            handleOnChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="name"
            name="name-overlay"
            text="Nome"
            placeholder="Digite seu nome"
            customClass="column padding_login"
            handleOnChange={(e) => setName(e.target.value)}
          />
          <Input
            type="password"
            name="password"
            text="Senha"
            placeholder="Digite sua senha"
            customClass="column padding_login"
            handleOnChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="password"
            name="confirmPassword"
            text="Confirmar Senha"
            placeholder="Digite sua senha"
            customClass="column padding_login"
            handleOnChange={(e) => setConfirmPassword(e.target.value)}
          />
        </>
      ) : (
        <p>{message || "Validando convite, aguarde..."}</p>
      )}

      <div className={styles.form_submit}>
        {!register ? (
          <>
            <Submit text="Entrar" />
            <button className={styles.btn} onClick={handleClick}>
              Criar conta
            </button>
          </>
        ) : isValid ? (
          <Submit customClass="align" text="Ativar conta" />
        ) : (
          <></>
        )}
      </div>
    </form>
 */
