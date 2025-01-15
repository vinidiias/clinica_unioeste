import FichaForm from "../FichaForm/FichaForm"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary"

const Ficha = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.isLogged) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
      <form>
        <FichaForm />
      </form>
  );
}

export default Ficha