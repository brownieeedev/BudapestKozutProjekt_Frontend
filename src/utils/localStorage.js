export const setItemToLocalStorage = (item) => {
  localStorage.setItem("jwt", item);
};

export const getItemFromLocalStorage = (item) => {
  return localStorage.getItem(item);
};

export const removeItemFromLocalStorage = (item) => {
  localStorage.removeItem(item);
};
