import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import indexHtml from "../index.html?raw";
import App from "./App";

const OLD_TITLE = /dress to impress/i;

describe("visible branding", () => {
  it("shows Style Runway on the intro screen and topbar", () => {
    render(<App />);
    expect(screen.getAllByText("Style Runway").length).toBeGreaterThan(0);
    expect(document.body.textContent).not.toMatch(OLD_TITLE);
  });

  it("uses Style Runway as the document title", () => {
    const title = indexHtml.match(/<title>(.*?)<\/title>/)?.[1] ?? "";
    expect(title).toContain("Style Runway");
    expect(title).not.toMatch(OLD_TITLE);
  });
});
