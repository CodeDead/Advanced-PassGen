/**
 * Generate an array of passwords
 * @param minLength The minimum length of the password
 * @param maxLength The maximum length of the password
 * @param characterSet The character set to use
 * @param amount The amount of passwords to generate
 * @param allowDuplicates Whether to allow duplicate passwords
 * @returns {*[]} The array of passwords
 * @constructor
 */
const PasswordGenerator = (minLength, maxLength, characterSet, amount, allowDuplicates) => {
  const passwordArray = [];
  for (let i = 0; i < amount; i += 1) {
    let canContinue = false;

    while (!canContinue) {
      let password = '';
      const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
      for (let j = 0; j < length; j++) {
        password += characterSet[Math.floor(Math.random() * characterSet.length)];
      }

      if (allowDuplicates || !passwordArray.contains(password)) {
        passwordArray.push(password);
        canContinue = true;
      }
    }
  }

  return passwordArray;
};

export default PasswordGenerator;
