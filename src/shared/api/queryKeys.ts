export const queryKeys = {
  profile: ["profile"] as const,
  favorite: ["favorite"] as const,
  top10: ["top10"] as const,
  randomMovie: ["movie"] as const,
  genres: ["genres"] as const,
  movie: (id: string | number) => ["movie", id] as const,
  genre: (name: string) => ["genre", name] as const,
  search: (title: string) => [title, "title"] as const,
};
