import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { useQueryMedia } from "./useQueryMedia";

describe("useQueryMedia", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "matchMedia",
      vi.fn().mockImplementation((query: string) => ({
        matches: query.includes("max-width"),
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    );
  });

  it("returns matchMedia snapshot", () => {
    const { result } = renderHook(() => useQueryMedia("(max-width: 767px)"));
    expect(result.current).toBe(true);
  });

  it("returns false for non-matching query", () => {
    const { result } = renderHook(() => useQueryMedia("(min-width: 2000px)"));
    expect(result.current).toBe(false);
  });
});
