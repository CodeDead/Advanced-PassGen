using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;

namespace Advanced_PassGen.Classes
{
    /// <summary>
    /// A static class to generate random strings.
    /// </summary>
    internal static class Generator
    {
        /// <summary>
        /// Generate a random string.
        /// </summary>
        /// <param name="length">The length of the string that needs to be generated.</param>
        /// <param name="characterSet">The characterset that the generator can use.</param>
        /// <returns></returns>
        internal static string GetRandomString(int length, IEnumerable<char> characterSet)
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
