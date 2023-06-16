import { orderQuerySplit } from "../utils/parksUtils";

describe("orderQuerySplit", () => {
  test("should return an array", () => {
    expect(orderQuerySplit("")).toEqual([""]);
  });
  test("should split the string on : and return 2 strings", () => {
    expect(orderQuerySplit("str1:str2")).toEqual(["str1", "str2"]);
  });
  test("if no colon is present, returns a single string", () => {
    expect(orderQuerySplit("str1")).toEqual(["str1"]);
  });
});
