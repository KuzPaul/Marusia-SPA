import { describe, expect, it } from "vitest";
import { getYouTubeId } from "./getYouTubeId";

describe("getYouTubeId", () => {
  it("returns id when passed 11-char id", () => {
    expect(getYouTubeId("dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
  });

  it("parses youtube.com watch url", () => {
    expect(
      getYouTubeId("https://www.youtube.com/watch?v=dQw4w9WgXcQ"),
    ).toBe("dQw4w9WgXcQ");
  });

  it("parses youtu.be short url", () => {
    expect(getYouTubeId("https://youtu.be/dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
  });

  it("returns null for empty or invalid input", () => {
    expect(getYouTubeId("")).toBeNull();
    expect(getYouTubeId("not-a-url")).toBeNull();
  });
});
