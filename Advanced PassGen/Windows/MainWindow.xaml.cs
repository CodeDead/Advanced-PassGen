using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using System.Windows;
using System.Windows.Controls;
using Advanced_PassGen.Classes;
using Microsoft.Win32;

namespace Advanced_PassGen.Windows
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow
    {
        #region Variables

        internal readonly UpdateManager UpdateManager;
        private readonly GridViewColumn _gvc;

        #endregion

        /// <summary>
        /// Initiate a new MainWindow.
        /// </summary>
        public MainWindow()
        {
            UpdateManager = new UpdateManager("http://codedead.com/Software/Advanced%20PassGen/update.xml");

            InitializeComponent();
            ChangeVisualStyle();
            LoadSettings();

            _gvc = new GridViewColumn
            {
                CellTemplate = GvcStrength.CellTemplate,
                CellTemplateSelector = GvcStrength.CellTemplateSelector,
                Header = GvcStrength.Header,
                DisplayMemberBinding = GvcStrength.DisplayMemberBinding,
            };

            try
            {
                if (Properties.Settings.Default.AutoUpdate)
                {
                    UpdateManager.CheckForUpdate(false, false);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(this, ex.Message, "Advanced PassGen", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        /// <summary>
        /// Change the GUI to represent the current settings.
        /// </summary>
        internal void LoadSettings()
        {
            LblVersion.Content = "Version: " + Assembly.GetExecutingAssembly().GetName().Version;
            try
            {
                TxtCharacterSet.Text = Properties.Settings.Default.CharacterSet;
                if (!Properties.Settings.Default.ShowPasswordStrength)
                {
                    DynGrid.Columns.RemoveAt(2);
                }
                else
                {
                    if (DynGrid.Columns.Count == 2)
                    {
                        DynGrid.Columns.Add(_gvc);
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(this, ex.Message, "Advanced PassGen", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        /// <summary>
        /// Change the visual style of the controls, depending on the settings.
        /// </summary>
        internal void ChangeVisualStyle()
        {
            StyleManager.ChangeStyle(this);
        }

        private void chbUseAdvanced_Checked(object sender, RoutedEventArgs e)
        {
            if (ChbUseAdvanced.IsChecked == null) return;
            GrbAdvanced.IsEnabled = ChbUseAdvanced.IsChecked.Value;
            TxtLength.IsEnabled = !ChbUseAdvanced.IsChecked.Value;
        }

        private void HypSettings_Click(object sender, RoutedEventArgs e)
        {
            new SettingsWindow(this).ShowDialog();
        }

        private async void BtnGenerate_Click(object sender, RoutedEventArgs e)
        {
            string charSet = "";
            int minValue = 1;
            int maxValue = 1;

            if (ChbUseAdvanced.IsChecked != null && !ChbUseAdvanced.IsChecked.Value)
            {
                if (ChbNumbers.IsChecked != null && (ChbSpecialCharacters.IsChecked != null && (ChbSmallLetters.IsChecked != null && (ChbCapitalLetters.IsChecked != null && (!ChbCapitalLetters.IsChecked.Value && !ChbSmallLetters.IsChecked.Value && !ChbSpecialCharacters.IsChecked.Value && !ChbNumbers.IsChecked.Value)))))
                {
                    MessageBox.Show(this, "Please select at least one option!", "Advanced PassGen", MessageBoxButton.OK, MessageBoxImage.Exclamation);
                    return;
                }
            }
            else
            {
                charSet += TxtCharacterSet.Text;
            }

            if (ChbSmallLetters.IsChecked != null && ChbSmallLetters.IsChecked.Value)
            {
                charSet += "abcdefghijklmnopqrstuvwxyz";
            }
            if (ChbCapitalLetters.IsChecked != null && ChbCapitalLetters.IsChecked.Value)
            {
                charSet += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            }
            if (ChbSpecialCharacters.IsChecked != null && ChbSpecialCharacters.IsChecked.Value)
            {
                charSet += "=+-(){}[]!?.,:/%^*";
            }
            if (ChbNumbers.IsChecked != null && ChbNumbers.IsChecked.Value)
            {
                charSet += "0123456789";
            }

            LsvPasswordList.Items.Clear();

            if (ChbUseAdvanced.IsChecked != null && ChbUseAdvanced.IsChecked.Value)
            {
                if (TxtMinLength.Value != null)
                {
                    minValue = (int) TxtMinLength.Value;
                    if (TxtMaxLength.Value != null)
                    {
                        maxValue = (int) TxtMaxLength.Value;
                    }
                }
            }
            else
            {
                if (TxtLength.Value != null)
                {
                    minValue = (int) TxtLength.Value;
                    maxValue = (int) TxtLength.Value;
                }
            }

            if (TxtAmount.Value == null) return;
            if (TxtRandomSeed.Value == null) return;

            Generator gen = new Generator(charSet, minValue, maxValue + 1, (int) TxtAmount.Value, (int) TxtRandomSeed.Value);
            List<Password> passwords = await gen.GeneratePasswords();

            foreach (Password s in passwords)
            {
                LsvPasswordList.Items.Add(s);
            }
            TceTabs.SelectedIndex = 3;
        }

        private void BtnExport_Click(object sender, RoutedEventArgs e)
        {
            if (LsvPasswordList.Items.Count == 0) return;

            SaveFileDialog sfd = new SaveFileDialog {Filter = "Text file(*.txt)|*.txt|HTML file(*.html)|*.html|*CSV file(*.csv)|*.csv"};
            bool? res = sfd.ShowDialog();
            if (res == true)
            {
                try
                {
                    StreamWriter sw = new StreamWriter(sfd.FileName);
                    string items = "";
                    switch (sfd.FilterIndex)
                    {
                        case 1:
                            items += "Password List - Generated by Advanced PassGen" + Environment.NewLine;
                            for (int i = 0; i < LsvPasswordList.Items.Count; i++)
                            {
                                Password pwd = LsvPasswordList.Items.GetItemAt(i) as Password;
                                if (pwd == null) continue;
                                items += pwd.ActualPassword;
                                if (i != LsvPasswordList.Items.Count - 1)
                                {
                                    items += Environment.NewLine;
                                }
                            }
                            break;
                        case 2:
                            items = "<html><body><h1>Password List - Generated by Advanced PassGen</h1><br /><table><tr><th>Password</th>";
                            if (Properties.Settings.Default.ExportLength)
                            {
                                items += "<th>Length</th>";
                            }
                            if (Properties.Settings.Default.ExportStrength)
                            {
                                items += "<th>Strength</th>";
                            }
                            items += "</tr>";

                            for (int i = 0; i < LsvPasswordList.Items.Count; i++)
                            {
                                Password pwd = LsvPasswordList.Items.GetItemAt(i) as Password;
                                if (pwd != null)
                                {
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
                            }
                            items += "</table></body></html>";
                            break;
                        case 3:
                            items += "Password List - Generated by Advanced PassGen" + Environment.NewLine + "Password";
                            if (Properties.Settings.Default.ExportLength)
                            {
                                items += Properties.Settings.Default.ExportDelimiter + "Length";
                            }
                            if (Properties.Settings.Default.ExportStrength)
                            {
                                items += Properties.Settings.Default.ExportDelimiter + "Strength";
                            }
                            items += Environment.NewLine;
                            for (int i = 0; i < LsvPasswordList.Items.Count; i++)
                            {
                                Password pwd = LsvPasswordList.Items.GetItemAt(i) as Password;
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
                                if (i != LsvPasswordList.Items.Count - 1)
                                {
                                    items += Environment.NewLine;
                                }
                            }
                            break;
                    }
                    sw.Write(items);
                    sw.Close();
                    MessageBox.Show(this, "File exported!", "Advanced PassGen", MessageBoxButton.OK);
                }
                catch (Exception ex)
                {
                    MessageBox.Show(this, ex.Message, "Advanced PassGen", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }
        }
    }
}
