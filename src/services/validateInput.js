// Referencia de Regex https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript
const validateInput = (userEmail, userPassword) => {
  const minPasswordLength = 6;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(userEmail) && userPassword.length > minPasswordLength;
};

export default validateInput;
