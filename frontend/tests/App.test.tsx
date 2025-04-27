import React from "react";
// import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "../src/App";

describe("App Component", () => {
  it("should render the app without crashing", () => {
    render(<App />);
    const linkElement = screen.getByText(/JourBuddy/i);
    expect(linkElement).toBeInTheDocument();
  });
});
