export const getIdTitleAlbumsMap = (arr) => {
  return arr.reduce((acc, { id, title }) => {
    return { ...acc, [id]: title };
  }, {});
};
