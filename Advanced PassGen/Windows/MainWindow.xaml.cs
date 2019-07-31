using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using Advanced_PassGen.Classes.Export;
using Advanced_PassGen.Classes.GUI;
using Advanced_PassGen.Classes.Password;
using CodeDead.UpdateManager.Classes;
using Microsoft.Win32;

namespace Advanced_PassGen.Windows
{
    /// <inheritdoc cref="Syncfusion.Windows.Shared.ChromelessWindow" />
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow
    {
        #region Variables
        /// <summary>
        /// The UpdateManager object that can check for updates
        /// </summary>
        private readonly UpdateManager _updateManager;
        /// <summary>
        /// The GridViewColumn in which items can be displayed
        /// </summary>
        private readonly GridViewColumn _gvc;
        /// <summary>
        /// The password generator that can be used to generate passwords
        /// </summary>
        private PasswordController _generator;
        /// <summary>
        /// A boolean to indicate whether set settings are loading or not
        /// </summary>
        private bool _loadingSetSettings;
        #endregion

        /// <inheritdoc />
        /// <summary>
        /// Initialize a new MainWindow
        /// </summary>
        public MainWindow()
        {
            StringVariables stringVariables = new StringVariables
            {
                CancelButtonText = "Cancel",
                DownloadButtonText = "Download",
                InformationButtonText = "Information",
                NoNewVersionText = "You are running the latest version!",
                TitleText = "Advanced PassGen",
                UpdateNowText = "Would you like to update the application now?"
            };

            _updateManager = new UpdateManager(Assembly.GetExecutingAssembly().GetName().Version, "https://codedead.com/Software/Advanced%20PassGen/update.json", stringVariables, DataType.Json);

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
                    _updateManager.CheckForUpdate(false, false);
                }

                if (Properties.Settings.Default.SaveOptions)
                {
                    LoadSetSettings();
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(this, ex.Message, "Advanced PassGen", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        /// <summary>
        /// Method that is called when the Window should be dragged
        /// </summary>
        /// <param name="sender">The object that called this method</param>
        /// <param name="e">The MouseButtonEventArgs</param>
        private void OnMouseDown(object sender, MouseButtonEventArgs e)
        {
            if (e.ChangedButton == MouseButton.Left && e.LeftButton == MouseButtonState.Pressed)
            {
                DragMove();
            }
        }

        /// <summary>
        /// Change the GUI to represent the current settings
        /// </summary>
        internal void LoadSettings()
        {
            try
            {
                TxtCharacterSet.Text = Properties.Settings.Default.CharacterSet;
                if (!Properties.Settings.Default.ShowPasswordStrength)
                {
                    if (DynGrid.Columns.Count == 3)
                    {
                        DynGrid.Columns.RemoveAt(2);
                    }
                }
                else
                {
                    if (DynGrid.Columns.Count == 2)
                    {
                        DynGrid.Columns.Add(_gvc);
                    }
                }

                if (Properties.Settings.Default.WindowDragging)
                {
                    // Delete event handler first to prevent duplicate handlers
                    MouseDown -= OnMouseDown;
                    MouseDown += OnMouseDown;
                }
                else
                {
                    MouseDown -= OnMouseDown;
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(this, ex.Message, "Advanced PassGen", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        /// <summary>
        /// Save the options that the user has selected
        /// </summary>
        private void SaveSetSettings()
        {
            try
            {
                if (TxtLength.Value != null) Properties.Settings.Default.SetLength = (int) TxtLength.Value.Value;
                if (TxtAmount.Value != null) Properties.Settings.Default.SetAmount = (int) TxtAmount.Value.Value;
                if (ChbSmallLetters.IsChecked != null) Properties.Settings.Default.SetSmallLetters = ChbSmallLetters.IsChecked.Value;
                if (ChbCapitalLetters.IsChecked != null) Properties.Settings.Default.SetCapitalLetters = ChbCapitalLetters.IsChecked.Value;
                if (ChbSpecialCharacters.IsChecked != null) Properties.Settings.Default.SetSpecialCharacters = ChbSpecialCharacters.IsChecked.Value;
                if (ChbNumbers.IsChecked != null) Properties.Settings.Default.SetNumbers = ChbNumbers.IsChecked.Value;
                if (ChbSpaces.IsChecked != null) Properties.Settings.Default.SetSpaces = ChbSpaces.IsChecked.Value;
                if (ChbBrackets.IsChecked != null) Properties.Settings.Default.SetBrackets = ChbBrackets.IsChecked.Value;

                if (ChbUseAdvanced.IsChecked != null) Properties.Settings.Default.SetAdvancedOptions = ChbUseAdvanced.IsChecked.Value;
                if (ChbBase64.IsChecked != null) Properties.Settings.Default.SetBase64 = ChbBase64.IsChecked.Value;
                if (TxtMinLength.Value != null) Properties.Settings.Default.SetMinLength = (int) TxtMinLength.Value.Value;
                if (TxtMaxLength.Value != null) Properties.Settings.Default.SetMaxLength = (int) TxtMaxLength.Value.Value;
                if (ChbAllowDuplicates.IsChecked != null) Properties.Settings.Default.SetDuplicates = ChbAllowDuplicates.IsChecked.Value;

                Properties.Settings.Default.Save();
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message, "Advanced PassGen", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        /// <summary>
        /// Load the options that the user has previously selected
        /// </summary>
        private void LoadSetSettings()
        {
            _loadingSetSettings = true;
            TxtLength.Value = Properties.Settings.Default.SetLength;
            TxtAmount.Value = Properties.Settings.Default.SetAmount;
            ChbSmallLetters.IsChecked = Properties.Settings.Default.SetSmallLetters;
            ChbCapitalLetters.IsChecked = Properties.Settings.Default.SetCapitalLetters;
            ChbSpecialCharacters.IsChecked = Properties.Settings.Default.SetSpecialCharacters;
            ChbNumbers.IsChecked = Properties.Settings.Default.SetNumbers;
            ChbSpaces.IsChecked = Properties.Settings.Default.SetSpaces;
            ChbBrackets.IsChecked = Properties.Settings.Default.SetBrackets;

            ChbUseAdvanced.IsChecked = Properties.Settings.Default.SetAdvancedOptions;
            ChbBase64.IsChecked = Properties.Settings.Default.SetBase64;
            TxtMinLength.Value = Properties.Settings.Default.SetMinLength;
            TxtMaxLength.Value = Properties.Settings.Default.SetMaxLength;
            ChbAllowDuplicates.IsChecked = Properties.Settings.Default.SetDuplicates;
            _loadingSetSettings = false;
        }

        /// <summary>
        /// Change the visual style of the controls, depending on the settings
        /// </summary>
        internal void ChangeVisualStyle()
        {
            StyleManager.ChangeStyle(this);
        }

        /// <summary>
        /// Method that will be called when the Advanced options checkbox has been checked or unchecked
        /// </summary>
        /// <param name="sender">The object that called this method</param>
        /// <param name="e">The routed event arguments</param>
        private void ChbUseAdvanced_Checked(object sender, RoutedEventArgs e)
        {
            if (!_loadingSetSettings) SaveSetSettings();
            if (ChbUseAdvanced.IsChecked == null) return;
            GrbAdvanced.IsEnabled = ChbUseAdvanced.IsChecked.Value;
            TxtLength.IsEnabled = !ChbUseAdvanced.IsChecked.Value;
        }

        /// <summary>
        /// Method that will be called when the user clicks on the Generate button
        /// </summary>
        /// <param name="sender">The object that called this method</param>
        /// <param name="e">The routed event arguments</param>
        private async void BtnGenerate_Click(object sender, RoutedEventArgs e)
        {
            string charSet = "";
            int minValue = 1;
            int maxValue = 1;
            bool base64 = false;

            if (ChbUseAdvanced.IsChecked != null && !ChbUseAdvanced.IsChecked.Value)
            {
                if (ChbNumbers.IsChecked != null 
                    && ChbSpecialCharacters.IsChecked != null
                    && ChbSmallLetters.IsChecked != null
                    && ChbCapitalLetters.IsChecked != null
                    && ChbBrackets.IsChecked != null
                    && ChbSpaces.IsChecked != null
                    && !ChbCapitalLetters.IsChecked.Value
                    && !ChbSmallLetters.IsChecked.Value
                    && !ChbSpecialCharacters.IsChecked.Value
                    && !ChbNumbers.IsChecked.Value
                    && !ChbBrackets.IsChecked.Value
                    && !ChbSpaces.IsChecked.Value)
                {
                    MessageBox.Show(this, "Please select at least one option!", "Advanced PassGen", MessageBoxButton.OK, MessageBoxImage.Exclamation);
                    return;
                }
            }
            else if (ChbUseAdvanced.IsChecked != null && ChbUseAdvanced.IsChecked.Value)
            {
                charSet += TxtCharacterSet.Text;
            }

            if (ChbSmallLetters.IsChecked != null && ChbSmallLetters.IsChecked.Value)
            {
                // ReSharper disable once StringLiteralTypo
                charSet += "abcdefghijklmnopqrstuvwxyz";
            }
            if (ChbCapitalLetters.IsChecked != null && ChbCapitalLetters.IsChecked.Value)
            {
                // ReSharper disable once StringLiteralTypo
                charSet += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            }
            if (ChbSpecialCharacters.IsChecked != null && ChbSpecialCharacters.IsChecked.Value)
            {
                charSet += "=+-_!?.,;:'\"/%^*$€£&µ@#";
            }
            if (ChbNumbers.IsChecked != null && ChbNumbers.IsChecked.Value)
            {
                charSet += "0123456789";
            }
            if (ChbBrackets.IsChecked != null && ChbBrackets.IsChecked.Value)
            {
                charSet += "<>(){}[]⟨⟩";
            }
            if (ChbSpaces.IsChecked != null && ChbSpaces.IsChecked.Value)
            {
                charSet += " ";
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
                if (ChbBase64.IsChecked != null && ChbBase64.IsChecked.Value)
                {
                    base64 = ChbBase64.IsChecked.Value;
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

            if (charSet.Length == 0)
            {
                MessageBox.Show("Character set cannot be empty!", "Advanced PassGen", MessageBoxButton.OK, MessageBoxImage.Error);
                return;
            }

            _generator = new PasswordController(charSet, minValue, maxValue + 1, (int) TxtAmount.Value, (int) TxtRandomSeed.Value, base64, ChbAllowDuplicates.IsChecked.Value);
            List<Password> passwords = await _generator.GeneratePasswords();

            foreach (Password s in passwords)
            {
                LsvPasswordList.Items.Add(s);
            }
        }

        /// <summary>
        /// Method that will be called when the Export button has been clicked
        /// </summary>
        /// <param name="sender">The object that called this method</param>
        /// <param name="e">The routed event arguments</param>
        private void BtnExport_Click(object sender, RoutedEventArgs e)
        {
            if (LsvPasswordList.Items.Count == 0) return;

            SaveFileDialog sfd = new SaveFileDialog {Filter = "Text file (*.txt)|*.txt|HTML file (*.html)|*.html|CSV file (*.csv)|*.csv|Excel file (*.csv)|*.csv|JSON (*.json)|*.json"};
            bool? res = sfd.ShowDialog();
            if (res != true) return;
            try
            {
                switch (sfd.FilterIndex)
                {
                    default:
                        ExportController.ExportText(sfd.FileName, _generator.PasswordList);
                        break;
                    case 2:
                        ExportController.ExportHtml(sfd.FileName, _generator.PasswordList);
                        break;
                    case 3:
                        ExportController.ExportCsv(sfd.FileName, _generator.PasswordList);
                        break;
                    case 4:
                        ExportController.ExportExcel(sfd.FileName, _generator.PasswordList);
                        break;
                    case 5:
                        ExportController.ExportJson(sfd.FileName, _generator.PasswordList);
                        break;
                }
                MessageBox.Show(this, "File exported!", "Advanced PassGen", MessageBoxButton.OK);
            }
            catch (Exception ex)
            {
                MessageBox.Show(this, ex.Message, "Advanced PassGen", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        /// <summary>
        /// Method that will be called when the Copy menu item has been clicked
        /// </summary>
        /// <param name="sender">The object that called this method</param>
        /// <param name="e">The routed event arguments</param>
        private void MiCopy_Click(object sender, RoutedEventArgs e)
        {
            if (LsvPasswordList.SelectedItems.Count == 0) return;

            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < LsvPasswordList.SelectedItems.Count; i++)
            {
                if (!(LsvPasswordList.SelectedItems[i] is Password pwd)) continue;
                if (i != LsvPasswordList.SelectedItems.Count -1)
                {
                    sb.AppendLine(pwd.ActualPassword);
                }
                else
                {
                    sb.Append(pwd.ActualPassword);
                }
            }

            if (sb.Length > 0)
            {
                Clipboard.SetText(sb.ToString());
            }
        }

        /// <summary>
        /// Method that will be called when the Remove menu item has been clicked
        /// </summary>
        /// <param name="sender">The object that called this method</param>
        /// <param name="e">The routed event arguments</param>
        private void MiRemove_Click(object sender, RoutedEventArgs e)
        {
            if (LsvPasswordList.SelectedItems.Count == 0) return;
            List<Password> passwords = LsvPasswordList.SelectedItems.Cast<Password>().ToList();

            foreach (Password t in passwords)
            {
                _generator.PasswordList.Remove(t);
                LsvPasswordList.Items.Remove(t);
            }
        }

        /// <summary>
        /// Method that will be called when the Clear menu item has been clicked
        /// </summary>
        /// <param name="sender">The object that called this method</param>
        /// <param name="e">The routed event arguments</param>
        private void MiClear_Click(object sender, RoutedEventArgs e)
        {
            LsvPasswordList.Items.Clear();
            _generator?.PasswordList.Clear();
        }

        /// <summary>
        /// Method that will be called when the Advise button has been clicked
        /// </summary>
        /// <param name="sender">The object that called this method</param>
        /// <param name="e">The routed event arguments</param>
        private void BtnAdvise_Click(object sender, RoutedEventArgs e)
        {
            if (PwbPassword.Password.Length == 0) return;
            Password pwd = new Password {ActualPassword = PwbPassword.Password};
            PgbStrength.Value = pwd.Strength;
        }

        /// <summary>
        /// Method that will be called when the Random seed generator button has been clicked
        /// </summary>
        /// <param name="sender">The object that called this method</param>
        /// <param name="e">The routed event arguments</param>
        private void BtnRandomSeed_Click(object sender, RoutedEventArgs e)
        {
            TxtRandomSeed.Text = Guid.NewGuid().GetHashCode().ToString();
        }

        /// <summary>
        /// Method that is called when the application should check for updates
        /// </summary>
        /// <param name="sender">The object that called this method</param>
        /// <param name="e">The RoutedEventArgs</param>
        private void UpdateMenuItem_OnClick(object sender, RoutedEventArgs e)
        {
            _updateManager.CheckForUpdate(true, true);
        }

        /// <summary>
        /// Method that is called when the CodeDead website should be opened
        /// </summary>
        /// <param name="sender">The object that called this method</param>
        /// <param name="e">The RoutedEventArgs</param>
        private void HomePageMenuItem_OnClick(object sender, RoutedEventArgs e)
        {
            try
            {
                System.Diagnostics.Process.Start("https://codedead.com/");
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message, "Advanced PassGen", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        /// <summary>
        /// Open the file containing the license for Advanced PassGen
        /// </summary>
        /// <param name="sender">The object that has initialized the method</param>
        /// <param name="e">The routed event arguments</param>
        private void LicenseMenuItem_OnClick(object sender, RoutedEventArgs e)
        {
            try
            {
                System.Diagnostics.Process.Start(AppDomain.CurrentDomain.BaseDirectory + "\\gpl.pdf");
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message, "Advanced PassGen", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        /// <summary>
        /// Open the file containing the help documentation for Advanced PassGen
        /// </summary>
        /// <param name="sender">The object that has initialized the method</param>
        /// <param name="e">The routed event arguments</param>
        private void HelpMenuItem_OnClick(object sender, RoutedEventArgs e)
        {
            try
            {
                System.Diagnostics.Process.Start(AppDomain.CurrentDomain.BaseDirectory + "\\help.pdf");
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message, "Advanced PassGen", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        /// <summary>
        /// Method that is called when the CodeDead donation page should be displayed
        /// </summary>
        /// <param name="sender">The object that called this method</param>
        /// <param name="e">The RoutedEventArgs</param>
        private void DonateMenuItem_OnClick(object sender, RoutedEventArgs e)
        {
            try
            {
                System.Diagnostics.Process.Start("https://codedead.com/?page_id=302");
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message, "Advanced PassGen", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        /// <summary>
        /// Method that is called when the about information should be displayed
        /// </summary>
        /// <param name="sender">The object that called this method</param>
        /// <param name="e">The RoutedEventArgs</param>
        private void AboutMenuItem_OnClick(object sender, RoutedEventArgs e)
        {
            new AboutWindow().ShowDialog();
        }

        /// <summary>
        /// Method that is called when the Settings window should be opened
        /// </summary>
        /// <param name="sender">The object that called this method</param>
        /// <param name="e">The RoutedEventArgs</param>
        private void SettingsMenuItem_OnClick(object sender, RoutedEventArgs e)
        {
            new SettingsWindow(this).ShowDialog();
        }

        /// <summary>
        /// Method that is called when the application should exit
        /// </summary>
        /// <param name="sender">The object that called this method</param>
        /// <param name="e">The RoutedEventArgs</param>
        private void ExitMenuItem_OnClick(object sender, RoutedEventArgs e)
        {
            Application.Current.Shutdown();
        }

        /// <summary>
        /// Method that is called when a integerTextBox value has changed
        /// </summary>
        /// <param name="d">The DependencyObject</param>
        /// <param name="e">The DependencyPropertyChangedEventArgs</param>
        private void SetTextBox_OnValueChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
        {
            if (_loadingSetSettings) return;
            SaveSetSettings();
        }

        /// <summary>
        /// Method that is called when a CheckBox value has changed
        /// </summary>
        /// <param name="sender">The object that called this method</param>
        /// <param name="e">The RoutedEventArgs</param>
        private void SetCheckBox_OnChecked(object sender, RoutedEventArgs e)
        {
            if (_loadingSetSettings) return;
            SaveSetSettings();
        }
    }
}
