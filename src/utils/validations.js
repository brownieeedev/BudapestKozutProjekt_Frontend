//VALIDATIONS
export const validateEmail = (input) => {
  // Regular expression to check email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(input);
};

export const validatePassword = (pass) => {
  return pass.length >= 8;
};
