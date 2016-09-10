using System.Text.RegularExpressions;

namespace Advanced_PassGen.Classes
{
    /// <summary>
    /// A static class to check the strength of a password.
    /// </summary>
    internal static class PasswordAdvisor
    {
        /// <summary>
        /// Check how a strong a password is.
        /// </summary>
        /// <param name="password">The password that needs to be evaluated.</param>
        /// <returns>Returns a password score.</returns>
        internal static int CheckStrength(string password)
        {
            int score = 0;

            if (string.IsNullOrEmpty(password))
            {
                return 0;
            }

            if (password.Length < 1)
            {
                return 0;
            }

            if (password.Length < 4)
            {
                return 1;
            }

            if (password.Length >= 8)
            {
                score++;
            }

            if (password.Length >= 10)
            {
                score++;
            }

            if (Regex.Match(password, @"\d", RegexOptions.ECMAScript).Success)
            {
                score++;
            }

            if (Regex.Match(password, @"[a-z]", RegexOptions.ECMAScript).Success &&Regex.Match(password, @"[A-Z]", RegexOptions.ECMAScript).Success)
            {
                score++;
            }

            if (Regex.Match(password, @"[!,@,#,$,%,^,&,*,?,_,~,-,£,(,)]", RegexOptions.ECMAScript).Success)
            {
                score++;
            }

            return score;
        }
    }
}
