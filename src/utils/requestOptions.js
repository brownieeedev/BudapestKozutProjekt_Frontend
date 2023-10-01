import { getItemFromLocalStorage } from "./localStorage";

//POST
export const postRequestOptions = (
  value1,
  value2,
  value3,
  value4,
  value5,
  value6,
  value7,
  value8,
  value9,
  value10
) => {
  const requestBody = {};

  if (value1 !== undefined) requestBody.value1 = value1;
  if (value2 !== undefined) requestBody.value2 = value2;
  if (value3 !== undefined) requestBody.value3 = value3;
  if (value4 !== undefined) requestBody.value4 = value4;
  if (value5 !== undefined) requestBody.value5 = value5;
  if (value6 !== undefined) requestBody.value6 = value6;
  if (value7 !== undefined) requestBody.value7 = value7;
  if (value8 !== undefined) requestBody.value8 = value8;
  if (value9 !== undefined) requestBody.value9 = value9;
  if (value10 !== undefined) requestBody.value10 = value10;
  return {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  };
};

export const postArrayRequestOptions = (arr = []) => {
  const accessToken = getItemFromLocalStorage("jwt");

  if (accessToken && arr) {
    return {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(arr),
    };
  } else {
    return {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(arr),
    };
  }
};

//GET
export const getRequestOptions = () => {
  const accessToken = getItemFromLocalStorage("jwt");

  if (accessToken) {
    return {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };
  } else {
    return {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
};

export const getRequestOptionsForRefresh = () => {
  return {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
};

export const basicPostRequest = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: {},
};

// //const requestOptions = {
//     method: "GET",
//     headers: { "Content-Type": "application/json" },
//   };
