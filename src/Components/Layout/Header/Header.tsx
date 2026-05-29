import {
  lazy,
  Suspense,
  useMemo,
  useState,
  type ReactElement,
} from "react";
import LogoHeader from "../../../assets/icons/headerIcon.svg?react";
import { Button } from "../../UI/Button";
import "./Header.scss";
import { Link, NavLink } from "react-router-dom";
import IconProfile from "../../../assets/icons/icon-profile.svg?react";
import IconGenre from "../../../assets/icons/icon-header-genre.svg?react";
import IconSearch from "../../../assets/icons/icon-header-search.svg?react";
import IconReset from "../../../assets/icons/btn__reset.svg?react";
import { WidgetSearch } from "../../../widgets/WidgetSearch";
import { useUser } from "../../../hooks/useUser";
import debounce from "lodash/debounce";
import { Loader } from "../../UI/Loader";

const AuthForm = lazy(() => import("../../AuthForm"));

export const Header = (): ReactElement => {
  const [activeFrom, setActive] = useState<boolean>(false);
  const [statusAuth, setAuth] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [debouncedTitle, setDebouncedTitle] = useState("");

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedTitle(value);
      }, 500),
    [],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);
    debouncedSearch(value);
  };

  const { userInfo, isPending } = useUser();

  return (
    <header className="header">
      <div className="container">
        <div className={`header__top`}>
          {activeFrom || statusAuth ? (
            <div className="header__overlay"></div>
          ) : (
            ""
          )}
          <Link
            className={`header__logo ${activeFrom ? "notActive" : ""}`}
            to={"/"}
            aria-label="ссылка на главную страницу"
          >
            <LogoHeader />
          </Link>
          <nav className="header__nav">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                `header__nav-link ${isActive ? "active" : ""}`
              }
            >
              Главная
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `header__nav-link ${isActive ? "active" : ""}`
              }
              to={"/genres"}
            >
              Жанры
            </NavLink>
          </nav>
          <form className={`header__search-form ${activeFrom ? "active" : ""}`}>
            <input
              className="header__search"
              type="search"
              placeholder="Поиск"
              name="search"
              id="search"
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e)
              }
            />
            {title && debouncedTitle ? (
              <WidgetSearch
                title={debouncedTitle}
                setTitle={setDebouncedTitle}
              />
            ) : (
              ""
            )}
            <IconSearch
              className="header__search-logo"
              width={24}
              height={24}
            />
            <Button
              className="header__search-reset button"
              type="reset"
              aria-label="стереть"
              onClick={() => {
                setTitle("");
                setDebouncedTitle("");
              }}
            >
              <IconReset width={24} height={24} />
            </Button>
          </form>

          {isPending ? (
            <div className="header__btn" aria-hidden="true">
              Войти
            </div>
          ) : userInfo ? (
            <NavLink
              to={"/profile"}
              className={({ isActive }) =>
                `header__userInfo ${isActive ? "active" : ""}`
              }
            >{`${userInfo.name}`}</NavLink>
          ) : (
            <Button
              className={"header__btn button"}
              type={"button"}
              onClick={() => setAuth(true)}
              aria-label="кнопка входа"
            >
              Войти
            </Button>
          )}
          <nav
            className={`header__nav-mobile ${activeFrom ? "notActive" : ""}`}
          >
            <Link to={"/genres"} className={"header__nav-mobile-genre"}>
              <IconGenre width={24} height={24} />
            </Link>

            <Button
              className="button header__btn-search"
              aria-label="кнопка поиска"
              onClick={() => setActive(!activeFrom)}
            >
              {" "}
              <IconSearch width={24} height={24} />
            </Button>
            {!userInfo ? (
              <Button
                className={"header__btn-mobile button"}
                type={"button"}
                onClick={() => setAuth(true)}
                aria-label="кнопка входа"
              >
                <IconProfile width={24} height={24} />
              </Button>
            ) : (
              <Link to={"/profile"}>
                <IconProfile width={24} height={24} />
              </Link>
            )}
          </nav>
        </div>
      </div>
      <Suspense fallback={<Loader />}>
        <AuthForm isOpen={statusAuth} onClose={setAuth} />
      </Suspense>
    </header>
  );
};
