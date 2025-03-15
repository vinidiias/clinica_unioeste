import { motion } from "framer-motion";
import styles from './withStyleAuth.module.css'

const withStyleAuth = (AuthComponent) => {
    const StylezedAuthComponent = (props) => {

      const cardVariants = {
        initial: { scale: 0.96, y: 30, opacity: 0 },
        animate: {
          scale: 1,
          y: 0,
          opacity: 1,
          transition: { duration: 1, ease: [0.48, 0.15, 0.25, 0.96] },
        },
        exit: {
          scale: 0.6,
          y: 100,
          opacity: 0,
          transition: { duration: 0.2, ease: [0.48, 0.15, 0.25, 0.96] },
        },
      };

      return (
        <motion.div
          key="registerAdmin"
          variants={cardVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className={styles.container}
        >
          <AuthComponent styleTitle={{ marginBottom: ".5em" }} {...props} />
        </motion.div>
      );
    }

    return StylezedAuthComponent
}

export default withStyleAuth