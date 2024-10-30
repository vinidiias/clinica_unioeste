import { useContext, useState } from 'react';
import styles from './PersonalData.module.css'
import api from '../../services/Api'
import { UserContext } from '../context/UserContext';

const Adress = ({ adress_completo='' }) => {
    const {setPessoa} = useContext(UserContext)
    const [edit, setEdit] = useState(true)
    const [adress, setAdress] = useState(adress_completo.adress)
    const [number, setNumber] = useState(adress_completo.number)

    function editToggle() {
        setEdit(!edit)
    }

    function validation(adress, number) {
        return ((adress !== undefined && adress !== '')) && (number !== undefined && number !== '')
    }

    async function editHandle() {
       if(!validation(adress, number)) {
            console.log('Dados de endereço incompleto(s)! Preencha todos os campos.')
            return
       }
       try{
            const adress_complet = {
                adress,
                number
            }
            console.log(adress_complet)
            /*
            ...logica de backend e atualizar o userContext
            await api.patch('/pessoa', {
                adress_complet,
            })
            .then((resp) => console.log(resp))
            */
           setPessoa(prevStat => ({
            ...prevStat,
            adress_user: adress_complet
           }))
       } catch(err){
        console.log(err)
       }
    }

    return (
      <div className={styles.containers}>
        <div className={styles.header}>
          <h3>Endereço</h3>
        </div>
        <div className={styles.infos}>
          <div className={styles.item}>
            <div className={styles.input}>
              <label htmlFor="adress">Endereço</label>
              <input disabled={edit} type="text" name="adress" id="adress" onChange={(e) => setAdress(e.target.value)} />
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.input}>
              <label htmlFor="number">Número</label>
              <input disabled={edit} type="text" name="number" id="number" onChange={(e) => setNumber(e.target.value)} />
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.submitEdit}>
              <button onClick={editToggle}>Editar dados</button>
              {!edit && <button onClick={editHandle}>Confirmar</button>}
            </div>
          </div>
        </div>
      </div>
    );
}

export default Adress