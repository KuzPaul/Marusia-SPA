import {
  lazy,
  Suspense,
  useMemo,
  useState,
  type ReactElement,
} from "react";
import LogoHeader from "@/assets/icons/headerIcon.svg?react";
import { Button } from "@/shared/ui/Button";
import { Link, NavLink } from "react-router-dom";
import IconProfile from "@/assets/icons/icon-profile.svg?react";
import IconGenre from "@/assets/icons/icon-header-genre.svg?react";
import IconSearch from "@/assets/icons/icon-header-search.svg?react";
import IconReset from "@/assets/icons/btn__reset.svg?react";
import { WidgetSearch } from "@/modules/search";
import { useUser } from "@/modules/auth/hooks/useUser";
import debounce from "lodash/debounce";
import { Loader } from "@/shared/ui/Loader";
import { cn } from "@/shared/lib/cn";
import styles from "./Header.module.scss";

const AuthForm = lazy(() => import("@/modules/auth"));

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
    <header className={styles.header}>
      <div className="container">
        <div className={styles.header__top}>
          {activeFrom || statusAuth ? (
            <div className={styles.header__overlay}></div>
          ) : (
            ""
          )}
          <Link
            className={cn(styles.header__logo, activeFrom && styles.notActive)}
            to={"/"}
            aria-label="ссылка на главную страницу"
          >
            <LogoHeader />
          </Link>
          <nav className={styles.header__nav}>
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                cn(styles["header__nav-link"], isActive && styles.active)
              }
            >
              Главная
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                cn(styles["header__nav-link"], isActive && styles.active)
              }
              to={"/genres"}
            >
              Жанры
            </NavLink>
          </nav>
          <form
            className={cn(
              styles["header__search-form"],
              activeFrom && styles.active,
            )}
          >
            <input
              className={styles.header__search}
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
              className={styles["header__search-logo"]}
              width={24}
              height={24}
            />
            <Button
              className={cn("button", styles["header__search-reset"])}
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
            <div className={styles.header__btn} aria-hidden="true">
              Войти
            </div>
          ) : userInfo ? (
            <NavLink
              to={"/profile"}
              className={({ isActive }) =>
                cn(styles.header__userInfo, isActive && styles.active)
              }
            >{`${userInfo.name}`}</NavLink>
          ) : (
            <Button
              className={cn(styles.header__btn, "button")}
              type={"button"}
              onClick={() => setAuth(true)}
              aria-label="кнопка входа"
            >
              Войти
            </Button>
          )}
          <nav
            className={cn(
              styles["header__nav-mobile"],
              activeFrom && styles.notActive,
            )}
          >
            <Link
              to={"/genres"}
              className={styles["header__nav-mobile-genre"]}
            >
              <IconGenre width={24} height={24} />
            </Link>

            <Button
              className={cn("button", styles["header__btn-search"])}
              aria-label="кнопка поиска"
              onClick={() => setActive(!activeFrom)}
            >
              {" "}
              <IconSearch width={24} height={24} />
            </Button>
            {!userInfo ? (
              <Button
                className={cn(styles["header__btn-mobile"], "button")}
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
      {statusAuth ? (
        <Suspense fallback={<Loader />}>
          <AuthForm isOpen={statusAuth} onClose={setAuth} />
        </Suspense>
      ) : null}
    </header>
  );
};
