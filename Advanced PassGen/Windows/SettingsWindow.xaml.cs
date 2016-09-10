using System;
using System.Windows;
using Advanced_PassGen.Classes;

namespace Advanced_PassGen.Windows
{
    /// <summary>
    /// Interaction logic for SettingsWindow.xaml
    /// </summary>
    public partial class SettingsWindow
    {
        #region Variables
        private readonly MainWindow _mw;
        #endregion

        /// <summary>
        /// Initiate a new SettingsWindow.
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
        /// Change the visual style of the controls, depending on the settings.
        /// </summary>
        private void ChangeVisualStyle()
        {
            StyleManager.ChangeStyle(this);
        }

        /// <summary>
        /// Change the GUI to represent the current settings.
        /// </summary>
        private void LoadSettings()
        {
            try
            {
                ChbAutoUpdate.IsChecked = Properties.Settings.Default.AutoUpdate;
                TxtCharacterSet.Text = Properties.Settings.Default.CharacterSet;

                ChbStyle.SelectedValue = Properties.Settings.Default.VisualStyle;
                CpMetroBrush.Color = Properties.Settings.Default.MetroColor;
                TxtBorderThickness.Value = Properties.Settings.Default.BorderThickness;
            }
            catch (Exception ex)
            {
                MessageBox.Show(this, ex.Message, "Advanced PassGen", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private void btnReset_Click(object sender, RoutedEventArgs e)
        {
            Properties.Settings.Default.Reset();
            Properties.Settings.Default.Save();
            LoadSettings();

            _mw.ChangeVisualStyle();
            ChangeVisualStyle();
        }

        private void btnSave_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                if (ChbAutoUpdate.IsChecked != null) Properties.Settings.Default.AutoUpdate = ChbAutoUpdate.IsChecked.Value;
                Properties.Settings.Default.CharacterSet = TxtCharacterSet.Text;

                Properties.Settings.Default.VisualStyle = ChbStyle.Text;
                Properties.Settings.Default.MetroColor = CpMetroBrush.Color;
                if (TxtBorderThickness.Value != null) Properties.Settings.Default.BorderThickness = (int)TxtBorderThickness.Value;

                Properties.Settings.Default.Save();

                _mw.ChangeVisualStyle();
                ChangeVisualStyle();
            }
            catch (Exception ex)
            {
                MessageBox.Show(this, ex.Message, "Advanced PassGen", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private void BtnUpdate_Click(object sender, RoutedEventArgs e)
        {
            _mw.UpdateManager.CheckForUpdate(true, true);
        }

        private void BtnWebsite_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                System.Diagnostics.Process.Start("http://codedead.com/");
            }
            catch (Exception ex)
            {
                MessageBox.Show(this, ex.Message, "Advanced PassGen", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }
    }
}
