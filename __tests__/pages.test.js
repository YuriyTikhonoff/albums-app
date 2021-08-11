import { getPageCount } from "../src/Utils/pages";

test("Get total number of pages", () => {
  expect(getPageCount(12, 4)).toEqual(3);
  expect(getPageCount(0, 4)).toEqual(0);
  expect(getPageCount(16, 5)).toEqual(4);
  expect(getPageCount(15, 5)).toEqual(3);
  expect(getPageCount(11, 5)).toEqual(3);
});
