import "./Loader.scss";

export const Loader = ({ text = "Загрузка..." }) => {
  return (
    <div className="loader">
      <div className="loader__spinner"></div>
      <p className="loader__text">{text}</p>
    </div>
  );
};
