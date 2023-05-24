import { describe, it, expect } from "@jest/globals";

describe("foo", () => {
  it("should pass", () => {
    expect(true).toBe(false);
    expect({}).toBeEmptyObject();
  });
  it.each([[1, 2]])("should pass", () => {});
});
