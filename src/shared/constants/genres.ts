const genrePngs = import.meta.glob("../../assets/genres/*.png", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

export const GENRE_IMAGES: Record<string, string> = Object.fromEntries(
  Object.entries(genrePngs).map(([filePath, url]) => {
    const name = filePath.replace(/^.*\//, "").replace(/\.png$/i, "");
    return [name, url];
  }),
);

export const GENRE_TRANSLATIONS: Record<string, string> = {
  history: "Исторический",
  horror: "Ужасы",
  scifi: "Фантастика",
  "stand-up": "Стендап",
  fantasy: "Фэнтези",
  drama: "Драма",
  mystery: "Детектив",
  family: "Семейный",
  comedy: "Комедия",
  romance: "Мелодрама",
  music: "Музыкальный",
  crime: "Криминал",
  "tv-movie": "ТВ-фильм",
  documentary: "Документальный",
  action: "Боевик",
  thriller: "Триллер",
  western: "Вестерн",
  animation: "Мультфильм",
  war: "Военный",
  adventure: "Приключения",
};
