import { getUrlParamsFromArr } from "../src/Utils/urlParams";

test("Consructing custom query string", () => {
  expect(getUrlParamsFromArr([1], "id")).toEqual("?id=1");
  expect(getUrlParamsFromArr([1, 6, 12], "id")).toEqual("?id=1&id=6&id=12");
  expect(getUrlParamsFromArr([], "id")).toEqual("");
});
