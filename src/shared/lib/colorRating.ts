export type RatingTone = "red" | "silver" | "green" | "gold";

export const colorRating = (rating: number): RatingTone => {
  if (rating < 4.5) return "red";
  if (rating < 7) return "silver";
  if (rating < 8) return "green";
  return "gold";
};
