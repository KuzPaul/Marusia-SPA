import { useState } from "react";
import { useFavorite } from "../../hooks/useFavorite";
import { useUser } from "../../hooks/useUser";
import { Button } from "../../Components/UI/Button";
import IconFavorite from "../../assets/icons/likeFilm.svg?react";
import IconProfile from "../../assets/icons/icon-profile.svg?react";
import "./UserAccountPage.scss";
import { useQueryMedia } from "../../hooks/useQueryMedia";
import { InfoUser } from "../../Components/InfoUser";
import { FavoriteMovies } from "../../Components/FavoriteMovies";

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
    <div className="user-profile">
      <div className="user-profile__block">
        <h1 className="user-profile__title">Мой аккаунт</h1>
        <nav className="user-profile__nav">
          <Button
            className={`user-profile__btn ${stateProfile === "favorite" ? "active" : ""} button `}
            onClick={() => setProfile("favorite")}
            aria-label="кнопка избранных фильмов"
            data-name="favorite"
          >
            <IconFavorite className="user-profile__icon" />
            <span className="user-profile__btn-text">{favoriteText}</span>
          </Button>
          <Button
            className={`user-profile__btn ${stateProfile === "info" ? "active" : ""} button `}
            onClick={() => setProfile("info")}
            aria-label="кнопка настройки аккаунта"
            data-name="info"
          >
            <IconProfile className="user-profile__icon" />
            <span className="user-profile__btn-text">{settingsText}</span>
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
