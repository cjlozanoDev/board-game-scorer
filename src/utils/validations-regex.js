export const validateEmailRegex = (email) => {
  const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  if (!regexEmail.test(email)) {
    return false;
  }
  return true;
};
