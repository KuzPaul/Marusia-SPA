import { describe, expect, it } from "vitest";
import { GENRE_IMAGES, GENRE_TRANSLATIONS } from "./genres";

describe("GENRE_TRANSLATIONS", () => {
  it("translates known genre keys", () => {
    expect(GENRE_TRANSLATIONS.drama).toBe("Драма");
    expect(GENRE_TRANSLATIONS.comedy).toBe("Комедия");
  });

  it("has translation for stand-up key", () => {
    expect(GENRE_TRANSLATIONS["stand-up"]).toBe("Стендап");
  });
});

describe("GENRE_IMAGES", () => {
  it("resolves drama poster to a bundled url", () => {
    expect(GENRE_IMAGES.drama).toMatch(/drama/);
  });
});
