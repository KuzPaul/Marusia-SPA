import { describe, expect, it } from "vitest";
import { validateResponse } from "./validate";

describe("validateResponse", () => {
  it("returns response when ok", async () => {
    const response = new Response("{}", { status: 200 });
    await expect(validateResponse(response)).resolves.toBe(response);
  });

  it("throws when response is not ok", async () => {
    const response = new Response("error", { status: 500 });
    await expect(validateResponse(response)).rejects.toThrow("error");
  });
});
