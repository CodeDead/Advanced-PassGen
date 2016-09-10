using System;
using System.Collections.Generic;
using System.Reflection;
using System.Windows;
using Advanced_PassGen.Classes;

namespace Advanced_PassGen.Windows
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow
    {
        #region Variables
        internal readonly UpdateManager UpdateManager;
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
        }

        /// <summary>
        /// Change the GUI to represent the current settings.
        /// </summary>
        private void LoadSettings()
        {
            LblVersion.Content += Assembly.GetExecutingAssembly().GetName().Version.ToString();
            try
            {
                if (Properties.Settings.Default.AutoUpdate)
                {
                    UpdateManager.CheckForUpdate(false, false);
                }

                TxtCharacterSet.Text = Properties.Settings.Default.CharacterSet;
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
                    maxValue = (int)TxtLength.Value;
                }
            }

            if (TxtAmount.Value == null) return;
            if (TxtRandomSeed.Value == null) return;

            Generator gen = new Generator(charSet, minValue, maxValue + 1, (int) TxtAmount.Value, (int) TxtRandomSeed.Value);
            List<string> passwords = await gen.GeneratePasswords();

            foreach (string s in passwords)
            {
                LsvPasswordList.Items.Add(new { X = s, Y = s.Length.ToString() });
            }
            TceTabs.SelectedIndex = 3;
        }
    }
}
