import { useState } from "react";
import { useFavorite } from "@/modules/movies/hooks/useFavorite";
import { useUser } from "@/modules/auth/hooks/useUser";
import { Button } from "@/shared/ui/Button";
import IconFavorite from "@/assets/icons/likeFilm.svg?react";
import IconProfile from "@/assets/icons/icon-profile.svg?react";
import { useQueryMedia } from "@/shared/lib/useQueryMedia";
import { InfoUser } from "@/modules/profile";
import { FavoriteMovies } from "@/modules/movies";
import { cn } from "@/shared/lib/cn";
import styles from "./UserAccountPage.module.scss";

export const UserAccountPage = () => {
  const [stateProfile, setProfile] = useState<"favorite" | "info">("favorite");
  const { userInfo } = useUser();
  const { deleteMoviesFavorite, getMoviesFavorite } = useFavorite();
  const screenBoolean = useQueryMedia("(max-width: 767px)");

  const [favoriteText, settingsText] = [
    screenBoolean ? "Избранное" : "Избранные фильмы",
    screenBoolean ? "Настройки" : "Настройка аккаунта",
  ];

  return (
    <div className={styles["user-profile"]}>
      <div className={styles["user-profile__block"]}>
        <h1 className={styles["user-profile__title"]}>Мой аккаунт</h1>
        <nav className={styles["user-profile__nav"]}>
          <Button
            className={cn(
              styles["user-profile__btn"],
              stateProfile === "favorite" && styles.active,
              "button",
            )}
            onClick={() => setProfile("favorite")}
            aria-label="кнопка избранных фильмов"
            data-name="favorite"
          >
            <IconFavorite className={styles["user-profile__icon"]} />
            <span className={styles["user-profile__btn-text"]}>
              {favoriteText}
            </span>
          </Button>
          <Button
            className={cn(
              styles["user-profile__btn"],
              stateProfile === "info" && styles.active,
              "button",
            )}
            onClick={() => setProfile("info")}
            aria-label="кнопка настройки аккаунта"
            data-name="info"
          >
            <IconProfile className={styles["user-profile__icon"]} />
            <span className={styles["user-profile__btn-text"]}>
              {settingsText}
            </span>
          </Button>
        </nav>
      </div>
      {stateProfile === "favorite" ? (
        <FavoriteMovies
          favorite={getMoviesFavorite.data}
          del={deleteMoviesFavorite}
        />
      ) : (
        <InfoUser user={userInfo} />
      )}
    </div>
  );
};
