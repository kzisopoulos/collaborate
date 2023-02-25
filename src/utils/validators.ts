const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) throw new Error("Email is invalid.");
};

const validateInput = (value: string) => {
  if (value.length < 2)
    throw new Error("Inputs must be more than 1 character long.");
};

const validateMatchingPassword = (password: string, passwordCheck: string) => {
  if (password !== passwordCheck) throw new Error("Passwords does not match.");
};

export { validateEmail, validateInput, validateMatchingPassword };
