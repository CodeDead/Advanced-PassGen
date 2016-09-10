using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace Advanced_PassGen.Classes
{
    /// <summary>
    /// A class to generate random strings.
    /// </summary>
    internal class Generator
    {
        #region Variables

        private readonly int _minLength;
        private readonly int _maxLength;
        private readonly int _amount;
        private readonly int _seed;

        private readonly string _charSet;

        private List<string> _passwordList;
        private static Random _rnd = new Random();

        #endregion

        /// <summary>
        /// Initiate a new Generator object.
        /// </summary>
        /// <param name="charSet">The character set that can be used to generate passwords with.</param>
        /// <param name="minLength">The minimum length of a password.</param>
        /// <param name="maxLength">The maximum length of a password.</param>
        /// <param name="amount">The amount of passwords that need to be generated.</param>
        /// <param name="seed">The seed for the random number generator.</param>
        internal Generator(string charSet, int minLength, int maxLength, int amount, int seed)
        {
            _charSet = charSet;
            _minLength = minLength;
            _maxLength = maxLength;
            _amount = amount;
            _seed = seed;
        }

        /// <summary>
        /// Generate a list of passwords.
        /// </summary>
        /// <returns>A list of passwords.</returns>
        internal async Task<List<string>> GeneratePasswords()
        {
            _passwordList = new List<string>();
            _rnd = new Random(_seed);
            await Task.Run(() =>
            {
                for (int i = 0; i < _amount; i++)
                {
                    var sub = _rnd.Next(_minLength, _maxLength);
                    string pwd = GetRandomString(sub, _charSet);
                    _passwordList.Add(pwd);
                }
            });
            return _passwordList;
        }

        /// <summary>
        /// Generate a random string.
        /// </summary>
        /// <param name="length">The length of the string that needs to be generated.</param>
        /// <param name="characterSet">The characterset that the generator can use.</param>
        /// <returns></returns>
        private static string GetRandomString(int length, IEnumerable<char> characterSet)
        {
            char[] characterArray = characterSet.Distinct().ToArray();
            byte[] bytes = new byte[length * 8];
            new RNGCryptoServiceProvider().GetBytes(bytes);
            char[] result = new char[length];
            for (int i = 0; i < length; i++)
            {
                ulong value = BitConverter.ToUInt64(bytes, i * 8);
                result[i] = characterArray[value % (uint)characterArray.Length];
            }
            return new string(result);
        }
    }
}
