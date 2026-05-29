import { describe, expect, it } from "vitest";
import { colorRating } from "./colorRating";

describe("colorRating", () => {
  it("returns red for low rating", () => {
    expect(colorRating(4)).toBe("home-page__rating--red");
  });

  it("returns silver for mid rating", () => {
    expect(colorRating(6)).toBe("home-page__rating--silver");
  });

  it("returns green for good rating", () => {
    expect(colorRating(7.5)).toBe("home-page__rating--green");
  });

  it("returns gold for high rating", () => {
    expect(colorRating(8.5)).toBe("home-page__rating--gold ");
  });
});
