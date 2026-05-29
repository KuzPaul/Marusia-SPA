import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("renders children and handles click", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <Button className="button" aria-label="test button" onClick={onClick}>
        Click me
      </Button>,
    );

    await user.click(screen.getByRole("button", { name: "test button" }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("is disabled when disabled prop is set", () => {
    render(
      <Button className="button" aria-label="disabled" disabled>
        Off
      </Button>,
    );

    expect(screen.getByRole("button", { name: "disabled" })).toBeDisabled();
  });
});
