/**
 * Calculate the strength of a password
 * @param password The password
 * @returns {number} The strength of the password between 0 and 100
 * @constructor
 */
const PasswordStrength = (password) => {
  let strength = 0;
  const { length } = password;
  const hasNumber = /\d/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasSymbol = /[!@#€£µ$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
  const hasRepetition = /([a-zA-Z0-9])\1{2,}/.test(password);
  const hasEmoji = /\p{Emoji}/u.test(password);

  if (length > 4) {
    strength += 10;
  }
  if (length > 8) {
    strength += 10;
  }
  if (length > 12) {
    strength += 10;
  }
  if (length > 14) {
    strength += 10;
  }
  if (hasNumber) {
    strength += 10;
  }
  if (hasLower) {
    strength += 10;
  }
  if (hasUpper) {
    strength += 10;
  }
  if (hasSymbol) {
    strength += 10;
  }
  if (hasRepetition) {
    strength -= 10;
  }
  if (hasEmoji) {
    strength += 10;
  }

  strength = (strength / 90) * 100;
  return strength;
};

export default PasswordStrength;
