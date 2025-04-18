import Graphemer from 'graphemer';

/**
 * Generate a secure random number between min and max
 * @param min The minimum number
 * @param max The maximum number
 * @returns {number} The secure random number between min and max (inclusive)
 */
const getRandomIntInclusive = (min, max) => {
  const randomBuffer = new Uint32Array(1);
  window.crypto.getRandomValues(randomBuffer);

  const randomNumber = randomBuffer[0] / (0xffffffff + 1);

  const newMin = Math.ceil(min);
  const newMax = Math.floor(max);

  return Math.floor(randomNumber * (newMax - newMin + 1)) + newMin;
};

/**
 * Generate an array of passwords
 * @param minLength The minimum length of the password
 * @param maxLength The maximum length of the password
 * @param characterSet The character set to use
 * @param includeSymbols Custom symbols to include
 * @param amount The amount of passwords to generate
 * @param allowDuplicates Whether to allow duplicate passwords
 * @returns {*[]} The array of passwords
 * @constructor
 */
export const PasswordGenerator = (
  minLength,
  maxLength,
  characterSet,
  includeSymbols,
  amount,
  allowDuplicates,
) => {
  const passwordArray = [];
  const splitter = new Graphemer();
  const totalCharacterSet = characterSet + includeSymbols;

  const graphemeCount = splitter.countGraphemes(totalCharacterSet);
  const graphemes = splitter.splitGraphemes(totalCharacterSet);

  let maxCount = 0;
  if (!allowDuplicates) {
    let current = parseInt(minLength, 10);
    while (current <= parseInt(maxLength, 10)) {
      maxCount += Math.pow(graphemeCount, current);
      current += 1;
    }
  }

  for (let i = 0; i < amount; i += 1) {
    let canContinue = false;

    while (!canContinue) {
      let password = '';
      const length = getRandomIntInclusive(minLength, maxLength);
      for (let j = 0; j < length; j += 1) {
        const randomBuffer = new Uint32Array(1);
        window.crypto.getRandomValues(randomBuffer);

        const randomNumber = randomBuffer[0] / (0xffffffff + 1);
        password += graphemes[Math.floor(randomNumber * graphemeCount)];
      }

      if (
        allowDuplicates === true ||
        (!allowDuplicates && !passwordArray.includes(password))
      ) {
        passwordArray.push(password);
        canContinue = true;
      }

      // We've reached the end of the line
      if (
        canContinue === false &&
        allowDuplicates === false &&
        passwordArray.length === maxCount
      ) {
        return passwordArray;
      }
    }
  }
  return passwordArray;
};
