import { describe, expect, it } from "vitest";
import { GENRE_TRANSLATIONS } from "./genres";

describe("GENRE_TRANSLATIONS", () => {
  it("translates known genre keys", () => {
    expect(GENRE_TRANSLATIONS.drama).toBe("Драма");
    expect(GENRE_TRANSLATIONS.comedy).toBe("Комедия");
  });

  it("has translation for stand-up key", () => {
    expect(GENRE_TRANSLATIONS["stand-up"]).toBe("Стендап");
  });
});
