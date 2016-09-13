using System;
using System.Collections.Generic;
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
        private PasswordGenerator _generator;

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
                charSet += "=+-<>(){}[]!?.,:/%^*$€£&µ";
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

            _generator = new PasswordGenerator(charSet, minValue, maxValue + 1, (int) TxtAmount.Value, (int) TxtRandomSeed.Value);
            List<Password> passwords = await _generator.GeneratePasswords();

            foreach (Password s in passwords)
            {
                LsvPasswordList.Items.Add(s);
            }
        }

        private void BtnExport_Click(object sender, RoutedEventArgs e)
        {
            if (LsvPasswordList.Items.Count == 0) return;

            SaveFileDialog sfd = new SaveFileDialog {Filter = "Text file(*.txt)|*.txt|HTML file(*.html)|*.html|*CSV file(*.csv)|*.csv"};
            bool? res = sfd.ShowDialog();
            if (res != true) return;
            try
            {
                // ReSharper disable once SwitchStatementMissingSomeCases
                switch (sfd.FilterIndex)
                {
                    case 1:
                        _generator.ExportText(sfd.FileName);
                        break;
                    case 2:
                        _generator.ExportHtml(sfd.FileName);
                        break;
                    case 3:
                        _generator.ExportCsv(sfd.FileName);
                        break;
                }
                MessageBox.Show(this, "File exported!", "Advanced PassGen", MessageBoxButton.OK);
            }
            catch (Exception ex)
            {
                MessageBox.Show(this, ex.Message, "Advanced PassGen", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private void MiCopy_Click(object sender, RoutedEventArgs e)
        {
            if (LsvPasswordList.SelectedItems.Count == 0) return;
            Password pwd = LsvPasswordList.SelectedItem as Password;
            if (pwd != null)
            {
                Clipboard.SetText(pwd.ActualPassword);
            }
        }

        private void MiRemove_Click(object sender, RoutedEventArgs e)
        {
            if (LsvPasswordList.SelectedItems.Count == 0) return;
            List<Password> passwords = new List<Password>();
            foreach (Password t in LsvPasswordList.SelectedItems)
            {
                passwords.Add(t);
            }

            foreach (Password t in passwords)
            {
                _generator.PasswordList.Remove(t);
                LsvPasswordList.Items.Remove(t);
            }
        }

        private void MiClear_Click(object sender, RoutedEventArgs e)
        {
            LsvPasswordList.Items.Clear();
            _generator?.PasswordList.Clear();
        }

        private void BtnAdvise_Click(object sender, RoutedEventArgs e)
        {
            if (PwbPassword.Password.Length == 0) return;
            Password pwd = new Password {ActualPassword = PwbPassword.Password};
            PgbStrength.Value = pwd.Strength;
        }

        private void HypUpdate_Click(object sender, RoutedEventArgs e)
        {
            UpdateManager.CheckForUpdate(true, true);
        }
    }
}
