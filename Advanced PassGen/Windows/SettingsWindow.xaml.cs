using System;
using System.Windows;
using System.Windows.Input;
using Advanced_PassGen.Classes;
using Advanced_PassGen.Classes.GUI;

namespace Advanced_PassGen.Windows
{
    /// <inheritdoc cref="Syncfusion.Windows.Shared.ChromelessWindow" />
    /// <summary>
    /// Interaction logic for SettingsWindow.xaml
    /// </summary>
    public partial class SettingsWindow
    {
        #region Variables
        /// <summary>
        /// The Main window object
        /// </summary>
        private readonly MainWindow _mw;
        #endregion

        /// <inheritdoc />
        /// <summary>
        /// Initialize a new SettingsWindow
        /// </summary>
        /// <param name="mw">The MainWindow.</param>
        public SettingsWindow(MainWindow mw)
        {
            _mw = mw;

            InitializeComponent();
            ChangeVisualStyle();
            LoadSettings();
        }

        /// <summary>
        /// Change the visual style of the controls, depending on the settings
        /// </summary>
        private void ChangeVisualStyle()
        {
            StyleManager.ChangeStyle(this);
        }

        /// <summary>
        /// Change the GUI to represent the current settings
        /// </summary>
        private void LoadSettings()
        {
            try
            {
                ChbAutoUpdate.IsChecked = Properties.Settings.Default.AutoUpdate;
                ChbPasswordStrength.IsChecked = Properties.Settings.Default.ShowPasswordStrength;
                TxtCharacterSet.Text = Properties.Settings.Default.CharacterSet;

                ChbStyle.SelectedValue = Properties.Settings.Default.VisualStyle;
                CpMetroBrush.Color = Properties.Settings.Default.MetroColor;
                TxtBorderThickness.Value = Properties.Settings.Default.BorderThickness;

                ChbExportLength.IsChecked = Properties.Settings.Default.ExportLength;
                ChbExportStrength.IsChecked = Properties.Settings.Default.ExportStrength;
            }
            catch (Exception ex)
            {
                MessageBox.Show(this, ex.Message, "Advanced PassGen", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        /// <summary>
        /// Method that will be called when the Reset button has been clicked
        /// </summary>
        /// <param name="sender">The object that called this method</param>
        /// <param name="e">The routed event arguments</param>
        private void BtnReset_Click(object sender, RoutedEventArgs e)
        {
            Properties.Settings.Default.Reset();
            Properties.Settings.Default.Save();
            LoadSettings();

            _mw.ChangeVisualStyle();
            _mw.LoadSettings();

            ChangeVisualStyle();
        }

        /// <summary>
        /// Method that will be called when the Save button has been clicked
        /// </summary>
        /// <param name="sender">The object that called this method</param>
        /// <param name="e">The routed event arguments</param>
        private void BtnSave_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                if (ChbAutoUpdate.IsChecked != null) Properties.Settings.Default.AutoUpdate = ChbAutoUpdate.IsChecked.Value;
                if (ChbPasswordStrength.IsChecked != null) Properties.Settings.Default.ShowPasswordStrength = ChbPasswordStrength.IsChecked.Value;
                Properties.Settings.Default.CharacterSet = TxtCharacterSet.Text;
                _mw.TxtCharacterSet.Text = TxtCharacterSet.Text;

                Properties.Settings.Default.VisualStyle = ChbStyle.Text;
                Properties.Settings.Default.MetroColor = CpMetroBrush.Color;
                if (TxtBorderThickness.Value != null) Properties.Settings.Default.BorderThickness = (int)TxtBorderThickness.Value;

                if (ChbExportLength.IsChecked != null) Properties.Settings.Default.ExportLength = ChbExportLength.IsChecked.Value;
                if (ChbExportStrength.IsChecked != null) Properties.Settings.Default.ExportStrength = ChbExportStrength.IsChecked.Value;

                Properties.Settings.Default.Save();

                _mw.ChangeVisualStyle();
                _mw.LoadSettings();
                ChangeVisualStyle();
            }
            catch (Exception ex)
            {
                MessageBox.Show(this, ex.Message, "Advanced PassGen", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        /// <summary>
        /// Method that will be called when the can execute handle has been called
        /// </summary>
        /// <param name="sender">The object that called this method</param>
        /// <param name="e">The routed event arguments</param>
        private void HandleCanExecute(object sender, CanExecuteRoutedEventArgs e)
        {
            if (e.Command != ApplicationCommands.Paste) return;
            e.CanExecute = false;
            e.Handled = true;
        }
    }
}
