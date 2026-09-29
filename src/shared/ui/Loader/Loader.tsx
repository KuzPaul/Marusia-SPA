import styles from "./Loader.module.scss";

export const Loader = ({ text = "Загрузка..." }) => {
  return (
    <div className={styles.loader}>
      <div className={styles.loader__spinner}></div>
      <p className={styles.loader__text}>{text}</p>
    </div>
  );
};
