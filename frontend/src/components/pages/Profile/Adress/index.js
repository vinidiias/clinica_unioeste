import { useContext, useState } from 'react';
import styles from '../PersonalData/index.module.css'
import api from '../../../../services/Api'
import { UserContext } from '../../../context/UserContext';

const Adress = ({ adress_completo='' }) => {
    const {userData, setPessoa, pessoa} = useContext(UserContext)
    const [edit, setEdit] = useState(true)
    const [adress, setAdress] = useState(adress_completo.adress)
    const [number, setNumber] = useState(adress_completo.number)

    function editToggle() {
        setEdit(!edit)
    }

    function validation(adress_complet) {
        return ((adress_complet.adress !== undefined && adress_complet.adress !== '')) && (adress_complet.number !== undefined && adress_complet.number !== '')
    }

    async function editHandle() {
      const adressComplet = {
        adress,
        number
    }
      console.log(adressComplet)
       if(!validation(adressComplet)) {
            console.log('Dados de endereço incompleto(s)! Preencha todos os campos.')
            return
       }
       try{
          const adressUpdated = await api.patch(`/pessoa/${userData.user_id}`, {adressComplet}, {
            headers: {'auth': `${userData.user_id}`}
          })

          if (!adressUpdated.data.pessoa) {
            console.error('Dados da pessoa não foram retornados:', adressUpdated);
            return;
          }
          
          const data = adressUpdated.data.pessoa

           setPessoa(prevStat => ({
            ...prevStat,
            adressComplet: data.adressComplet
           }))

           console.log(pessoa)
           editToggle()
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
              <input disabled={edit} value={adress} type="text" name="adress" id="adress" onChange={(e) => setAdress(e.target.value)} />
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.input}>
              <label htmlFor="number">Número</label>
              <input disabled={edit} value={number} type="text" name="number" id="number" onChange={(e) => setNumber(e.target.value)} />
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