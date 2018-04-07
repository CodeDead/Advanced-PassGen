using System.Text.RegularExpressions;

namespace Advanced_PassGen.Classes.PASSWORD
{
    /// <summary>
    /// This class represents a password
    /// </summary>
    internal sealed class Password
    {
        #region Variables
        /// <summary>
        /// The password, in string format
        /// </summary>
        private string _actualPassword;
        #endregion

        #region Properties
        /// <summary>
        /// The actual password in plain text
        /// </summary>
        public string ActualPassword
        {
            get => _actualPassword;
            set
            {
                _actualPassword = value;
                Strength = CheckStrength(_actualPassword);
                Length = value.Length;
            }
        }

        /// <summary>
        /// The length of the password
        /// </summary>
        public int Length { get; private set; }
        
        /// <summary>
        /// The strength of a password, indicated by a number ranging from 0 to 6. The higher the score, the stronger the password
        /// </summary>
        public int Strength { get; private set; }
        #endregion

        /// <summary>
        /// Check how a strong a password is. The higher the score, the stronger the password
        /// </summary>
        /// <param name="password">The password that needs to be evaluated</param>
        /// <returns>Returns the score of a password</returns>
        private static int CheckStrength(string password)
        {
            int score = 1;

            if (string.IsNullOrEmpty(password)) return 0;
            if (password.Length < 2) return 0;
            if (password.Length < 4) return score;
            if (password.Length >= 8) score++;
            if (password.Length >= 10) score++;
            if (password.Length >= 14) score++;

            if (Regex.Match(password, @"\d", RegexOptions.ECMAScript).Success) score++;
            if (Regex.Match(password, @"[a-z]", RegexOptions.ECMAScript).Success && Regex.Match(password, @"[A-Z]", RegexOptions.ECMAScript).Success) score++;
            if (Regex.Match(password, @"[:,µ,;, ,<,>,+,!,@,#,$,%,^,&,*,?,_,~,-,£,(,);\[,\],⟨,⟩]", RegexOptions.ECMAScript).Success) score++;

            return score;
        }
    }
}
