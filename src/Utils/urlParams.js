export const getUrlParamsFromArr = (arr, paramName) => {
  return `${arr?.length > 0 ? "?" : ""}${arr
    .map((paramVal) => `${paramName}=${paramVal}`)
    .join("&")}`;
};
