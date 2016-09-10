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
        internal readonly UpdateManager _updateManager;

        public MainWindow()
        {
            _updateManager = new UpdateManager("http://codedead.com/Software/Advanced%20PassGen/update.xml");

            InitializeComponent();
            ChangeVisualStyle();
            LoadSettings();
            
            new SettingsWindow(this).Show();
        }

        private void LoadSettings()
        {
            try
            {
                if (Properties.Settings.Default.AutoUpdate)
                {
                    _updateManager.CheckForUpdate(false, false);
                }

                txtCharacterSet.Text = Properties.Settings.Default.CharacterSet;
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
            if (chbUseAdvanced.IsChecked == null) return;
            grbAdvanced.IsEnabled = chbUseAdvanced.IsChecked.Value;
            txtLength.IsEnabled = !chbUseAdvanced.IsChecked.Value;
        }
    }
}
