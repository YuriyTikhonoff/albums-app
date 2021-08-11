import { getIdTitleAlbumsMap } from "../src/Utils/maps";

const mockArr = [
  { id: 1, title: "One" },
  { id: 2, title: "New Zeland" },
  { id: 99, title: "Something" },
];

test("Preparing custom maps(dictionaries) for retrieving fields", () => {
  expect(getIdTitleAlbumsMap(mockArr)["1"]).toEqual("One");
  expect(getIdTitleAlbumsMap(mockArr)["2"]).toEqual("New Zeland");
  expect(getIdTitleAlbumsMap(mockArr)["99"]).toEqual("Something");
  expect(getIdTitleAlbumsMap(mockArr)["3"]).toEqual(undefined);
});
