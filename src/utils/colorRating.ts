export const colorRating = (rating: number): string => {
  if (rating < 4.5) return "home-page__rating--red";
  if (rating < 7) return "home-page__rating--silver";
  if (rating < 8) return "home-page__rating--green";
  return "home-page__rating--gold ";
};
