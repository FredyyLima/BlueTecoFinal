export const getStoragedObject = (key: string) => {
  return localStorage.getItem(key) && localStorage.getItem(key) !== "undefined"
    ? localStorage.getItem(key)
    : null;
};
