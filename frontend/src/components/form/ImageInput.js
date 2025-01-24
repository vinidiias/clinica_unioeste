import styles from './ImageInput.module.css'

const ImageInput = ({ text, name, customClass, handleFileChange }) => {
      return (
        <label className={styles[customClass]} htmlFor="file-img">
          <input
            id={name}
            name={name}
            className={styles.file}
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleFileChange}
          />
          <span>{text}</span>
        </label>
      );
}

export default ImageInput