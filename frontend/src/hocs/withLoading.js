import { useEffect, useState } from "react"
import api from "../services/Api"
import { FaInternetExplorer } from "react-icons/fa"
import Loading from "../components/layout/Loading"

const withLoading = (Component, url) => {
    const NewComponent = (props) => {
        const [loading, setLoading] = useState(false)
        const [data, setData] = useState([])
        
        useEffect(() => {
            setLoading(true)
            api.get(url)
            .then((data) => setData(data.data))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false))
        },[])

        return (
          <>{loading ? <Loading /> : <Component data={data} {...props} />}</>
        );
    }

    return NewComponent
}

export default withLoading