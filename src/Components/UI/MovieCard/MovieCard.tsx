import { memo, type FC, type ReactNode } from "react";
import { Link } from "react-router-dom";

interface MovieProps {
  id: number;
  poster: string | null;
  classNameLink: string;
  classNameImg: string;
  children?: ReactNode;
}

export const MovieCard: FC<MovieProps> = memo(
  ({ id, poster, classNameLink, classNameImg, children }) => {
    return (
      <Link to={`/movie/${id}`} className={classNameLink}>
        <img
          className={classNameImg}
          src={poster || undefined}
          alt="постер фильма"
          loading="lazy"
        />
        {children}
      </Link>
    );
  },
);
