using System;
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
    }
}
