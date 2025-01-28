import { useEffect, useState } from "react"
import api from "../services/Api"
import Loading from "../components/layout/Loading"

const withLoading = (Component) => {
  const NewComponent = ({ url, id, ...props }) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await api.get(url, { headers: { auth: id || '' } });
          setData(response.data);
        } catch (error) {
          console.error("Erro ao buscar dados:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, [url, id]);

    return (
      <>
        {loading ? (
          <Loading />
        ) : (
          <Component data={data} {...props} />
        )}
      </>
    );
  };

  return NewComponent;
};

export default withLoading;
