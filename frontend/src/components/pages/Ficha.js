import FichaForm from "../ficha/FichaForm"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

const Ficha = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.isLogged) {
      navigate("/");
    }
  }, [user, navigate]);

  return <FichaForm />
}

export default Ficha