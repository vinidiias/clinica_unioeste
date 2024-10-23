import { useNavigate } from 'react-router-dom';


const ErrorPage = () => {
    const navigate = useNavigate();
  
    const goHome = () => {
      navigate('/');  // Redireciona para a página inicial
    };
  
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h1>Oops! Página não encontrada.</h1>
        <p>Algo deu errado. Verifique o endereço e tente novamente.</p>
        <button onClick={goHome} style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Voltar à página inicial
        </button>
      </div>
    );
}

export default ErrorPage