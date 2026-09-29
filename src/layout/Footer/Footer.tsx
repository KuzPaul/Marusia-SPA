import { cn } from "@/shared/lib/cn";
import styles from "./Footer.module.scss";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footer__socials}>
          <ul className={styles["footer__socials-list"]}>
            <li className={styles["footer__socials-item"]}>
              <a
                className={cn(
                  styles["footer__socials-link"],
                  styles["footer__socials-link--vk"],
                )}
                href="#"
                aria-label="ВКонтакте"
              ></a>
            </li>
            <li className={styles["footer__socials-item"]}>
              <a
                className={cn(
                  styles["footer__socials-link"],
                  styles["footer__socials-link--youTube"],
                )}
                href="#"
                aria-label="YouTube"
              ></a>
            </li>
            <li className={styles["footer__socials-item"]}>
              <a
                className={cn(
                  styles["footer__socials-link"],
                  styles["footer__socials-link--ok"],
                )}
                href="#"
                aria-label="Одноклассники"
              ></a>
            </li>
            <li className={styles["footer__socials-item"]}>
              <a
                className={cn(
                  styles["footer__socials-link"],
                  styles["footer__socials-link--telegram"],
                )}
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
