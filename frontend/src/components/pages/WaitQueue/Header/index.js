import styles from './index.module.css'

const HeaderQueue = ({ children }) => {
  return (
    <div className={styles.header}>
      {children}
    </div>
  );
};

export default HeaderQueue;

