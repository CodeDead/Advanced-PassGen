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
// eslint-disable-next-line import/prefer-default-export
export function PasswordGenerator(minLength, maxLength, characterSet, amount, allowDuplicates) {
  const passwordArray = [];

  let maxCount = 0;
  if (!allowDuplicates) {
    let current = minLength;
    while (current <= maxLength) {
      // eslint-disable-next-line no-restricted-properties,prefer-exponentiation-operator
      maxCount += Math.pow(characterSet.length, current);
      current += 1;
    }
  }

  for (let i = 0; i < amount; i += 1) {
    let canContinue = false;

    while (!canContinue) {
      let password = '';
      const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
      for (let j = 0; j < length; j += 1) {
        password += characterSet[Math.floor(Math.random() * characterSet.length)];
      }

      if (allowDuplicates === true) {
        passwordArray.push(password);
        canContinue = true;
      } else if (!passwordArray.includes(password)) {
        passwordArray.push(password);
        canContinue = true;
      }

      // We've reached the end of the line
      if (canContinue === false && allowDuplicates === false
        && passwordArray.length === maxCount) {
        break;
      }
    }
  }
  return passwordArray;
}
