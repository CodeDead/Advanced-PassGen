using System;
using System.Collections.Generic;
using System.IO;
using Advanced_PassGen.Classes.PASSWORD;

namespace Advanced_PassGen.Classes.Export
{
    /// <summary>
    /// Interal logic for exporting data
    /// </summary>
    internal sealed class ExportController
    {
        /// <summary>
        /// Export a password list as a text file
        /// </summary>
        /// <param name="path">The path where the text file should be stored</param>
        /// <param name="passwordList">The list of Password objects that need to be exported</param>
        internal static void ExportText(string path, List<Password> passwordList)
        {
            if (passwordList.Count < 1) return;
            string items = "Password List - Advanced PassGen" + Environment.NewLine;
            for (int i = 0; i < passwordList.Count; i++)
            {
                Password pwd = passwordList[i];
                if (pwd == null) continue;
                items += pwd.ActualPassword;
                if (i != passwordList.Count - 1)
                {
                    items += Environment.NewLine;
                }
            }
            FileWriter(path, items);
        }

        /// <summary>
        /// Export a password list as a HTML file
        /// </summary>
        /// <param name="path">The path where the HTML file should be stored</param>
        /// <param name="passwordList">The list of Password objects that need to be exported</param>
        internal static void ExportHtml(string path, List<Password> passwordList)
        {
            if (passwordList.Count < 1) return;
            string items = "<html><body><h1>Password List - Advanced PassGen</h1><br /><table><tr><th>Password</th>";
            if (Properties.Settings.Default.ExportLength)
            {
                items += "<th>Length</th>";
            }
            if (Properties.Settings.Default.ExportStrength)
            {
                items += "<th>Strength</th>";
            }
            items += "</tr>";

            foreach (Password pwd in passwordList)
            {
                if (pwd == null) continue;
                items += "<tr><td>" + pwd.ActualPassword + "</td>";
                if (Properties.Settings.Default.ExportLength)
                {
                    items += "<td>" + pwd.Length + "</td>";
                }
                if (Properties.Settings.Default.ExportStrength)
                {
                    items += "<td>" + pwd.Strength + "</td>";
                }
                items += "</tr>";
            }
            items += "</table></body></html>";
            FileWriter(path, items);
        }

        /// <summary>
        /// Export a password list as a CSV file
        /// </summary>
        /// <param name="path">The path where the CSV file should be stored</param>
        /// <param name="passwordList">The list of Password objects that need to be exported</param>
        internal static void ExportCsv(string path, List<Password> passwordList)
        {
            if (passwordList.Count < 1) return;
            string items = "Password List - Advanced PassGen" + Environment.NewLine + "Password";
            if (Properties.Settings.Default.ExportLength)
            {
                items += Properties.Settings.Default.ExportDelimiter + "Length";
            }
            if (Properties.Settings.Default.ExportStrength)
            {
                items += Properties.Settings.Default.ExportDelimiter + "Strength";
            }
            items += Environment.NewLine;
            for (int i = 0; i < passwordList.Count; i++)
            {
                Password pwd = passwordList[i];
                if (pwd != null)
                {
                    items += pwd.ActualPassword;
                    if (Properties.Settings.Default.ExportLength)
                    {
                        items += Properties.Settings.Default.ExportDelimiter + pwd.Length;
                    }
                    if (Properties.Settings.Default.ExportStrength)
                    {
                        items += Properties.Settings.Default.ExportDelimiter + pwd.Strength;
                    }
                }
                if (i != passwordList.Count - 1)
                {
                    items += Environment.NewLine;
                }
            }
            FileWriter(path, items);
        }

        /// <summary>
        /// Write a string to a file
        /// </summary>
        /// <param name="path">The path where the string should be stored</param>
        /// <param name="text">The text that should be written to the file</param>
        private static void FileWriter(string path, string text)
        {
            using (StreamWriter sw = new StreamWriter(path))
            {
                sw.Write(text);
            }
        }
    }
}
