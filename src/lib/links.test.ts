import { describe, expect, test } from "bun:test";
import { isLinkId, toCounts } from "./links";

describe("isLinkId", () => {
  test("등록된 링크 id만 허용", () => {
    expect(isLinkId("github")).toBe(true);
    expect(isLinkId("linkedin")).toBe(true);
    expect(isLinkId("email")).toBe(true);
  });

  test("등록되지 않은 값은 거부", () => {
    expect(isLinkId("unknown")).toBe(false);
    expect(isLinkId("")).toBe(false);
    expect(isLinkId("toString")).toBe(false);
    expect(isLinkId(undefined)).toBe(false);
    expect(isLinkId(1)).toBe(false);
    expect(isLinkId({ $ne: null })).toBe(false);
  });
});

describe("toCounts", () => {
  test("DB에 없는 링크는 0으로 채움", () => {
    expect(toCounts([{ _id: "github", count: 42 }])).toEqual({
      github: 42,
      linkedin: 0,
      email: 0,
    });
  });

  test("등록되지 않은 id 문서는 무시", () => {
    expect(toCounts([{ _id: "unknown", count: 7 }])).toEqual({
      github: 0,
      linkedin: 0,
      email: 0,
    });
  });
});
