import "./Footer.scss";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__socials">
          <ul className="footer__socials-list">
            <li className="footer__socials-item">
              <a
                className="footer__socials-link footer__socials-link--vk"
                href="#"
                aria-label="ВКонтакте"
              ></a>
            </li>
            <li className="footer__socials-item">
              <a
                className="footer__socials-link footer__socials-link--youTube"
                href="#"
                aria-label="YouTube"
              ></a>
            </li>
            <li className="footer__socials-item">
              <a
                className="footer__socials-link footer__socials-link--ok"
                href="#"
                aria-label="Одноклассники"
              ></a>
            </li>
            <li className="footer__socials-item">
              <a
                className="footer__socials-link footer__socials-link--telegram"
                href="#"
                aria-label="Telegram"
              ></a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
