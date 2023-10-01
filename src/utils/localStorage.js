export const setCartItemsToLocalStorage = (cartItems) => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export const getItemFromLocalStorage = (item) => {
  return localStorage.getItem(item);
};

export const getCartItemFromLocalStorage = (arr) => {
  return localStorage.getItem(JSON.parse(arr));
};

export const removeItemFromLocalStorage = (item) => {
  localStorage.removeItem(item);
};
