import Graphemer from 'graphemer';

const GraphemerConstructor = Graphemer.default ?? Graphemer;

/**
 * Generate a secure random number between min and max
 * @param min The minimum number
 * @param max The maximum number
 * @returns {number} The secure random number between min and max (inclusive)
 */
const getRandomIntInclusive = (min, max) => {
  const randomBuffer = new Uint32Array(1);
  globalThis.crypto.getRandomValues(randomBuffer);

  const randomNumber = randomBuffer[0] / (0xffffffff + 1);

  const newMin = Math.ceil(min);
  const newMax = Math.floor(max);

  return Math.floor(randomNumber * (newMax - newMin + 1)) + newMin;
};

const getMaxUniquePasswordCount = (minLength, maxLength, graphemeCount) => {
  let maxCount = 0;

  for (let current = minLength; current <= maxLength; current += 1) {
    maxCount += graphemeCount ** current;
  }

  return maxCount;
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
  const parsedMinLength = Math.ceil(Number(minLength));
  const parsedMaxLength = Math.floor(Number(maxLength));
  const parsedAmount = Math.max(0, Math.floor(Number(amount)));
  const totalCharacterSet = `${characterSet}${includeSymbols}`;

  if (
    !Number.isFinite(parsedMinLength) ||
    !Number.isFinite(parsedMaxLength) ||
    !Number.isFinite(parsedAmount) ||
    parsedAmount === 0 ||
    parsedMinLength > parsedMaxLength ||
    totalCharacterSet.length === 0
  ) {
    return [];
  }

  const passwordArray = [];
  const generatedPasswords = allowDuplicates ? null : new Set();
  const splitter = new GraphemerConstructor();
  const graphemes = splitter.splitGraphemes(totalCharacterSet);
  const graphemeCount = graphemes.length;

  if (graphemeCount === 0) {
    return [];
  }

  const maxUniquePasswordCount = allowDuplicates
    ? parsedAmount
    : getMaxUniquePasswordCount(
        parsedMinLength,
        parsedMaxLength,
        graphemeCount,
      );
  const targetAmount = allowDuplicates
    ? parsedAmount
    : Math.min(parsedAmount, maxUniquePasswordCount);

  while (passwordArray.length < targetAmount) {
    let password = '';
    const length = getRandomIntInclusive(parsedMinLength, parsedMaxLength);

    for (let index = 0; index < length; index += 1) {
      password += graphemes[getRandomIntInclusive(0, graphemeCount - 1)];
    }

    if (generatedPasswords?.has(password)) {
      continue;
    }

    generatedPasswords?.add(password);
    passwordArray.push(password);
  }

  return passwordArray;
};
