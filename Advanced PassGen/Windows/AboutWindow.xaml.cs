using System;
using System.Reflection;
using System.Windows;
using System.Windows.Input;
using Advanced_PassGen.Classes.GUI;

namespace Advanced_PassGen.Windows
{
    /// <inheritdoc cref="Syncfusion.Windows.Shared.ChromelessWindow" />
    /// <summary>
    /// Interaction logic for AboutWindow.xaml
    /// </summary>
    public partial class AboutWindow
    {
        public AboutWindow()
        {
            InitializeComponent();
            LoadProperties();
            ChangeVisualStyle();

            TxbInfo.Text = "Advanced PassGen was created by DeadLine.\n\nImages: small-n-flat by paomedia\nTheme: Syncfusion\nVersion: " + Assembly.GetExecutingAssembly().GetName().Version + "\n\nCopyright © CodeDead 2018";
        }

        /// <summary>
        /// Load the properties of the application
        /// </summary>
        private void LoadProperties()
        {
            try
            {
                if (Properties.Settings.Default.WindowDragging)
                {
                    MouseDown += OnMouseDown;
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message, "Advanced PassGen", MessageBoxButton.OK, MessageBoxImage.Error);
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
        /// Change the visual style of the controls, depending on the settings.
        /// </summary>
        private void ChangeVisualStyle()
        {
            StyleManager.ChangeStyle(this);
        }

        /// <summary>
        /// Close the current window
        /// </summary>
        /// <param name="sender">The object that has initialized the method</param>
        /// <param name="e">The routed event arguments</param>
        private void BtnClose_OnClick(object sender, RoutedEventArgs e)
        {
            Close();
        }

        /// <summary>
        /// Open the file containing the license for Advanced PassGen
        /// </summary>
        /// <param name="sender">The object that has initialized the method</param>
        /// <param name="e">The routed event arguments</param>
        private void BtnLicense_OnClick(object sender, RoutedEventArgs e)
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
        /// Open the CodeDead website
        /// </summary>
        /// <param name="sender">The object that has initialized the method</param>
        /// <param name="e">The routed event arguments</param>
        private void BtnCodeDead_OnClick(object sender, RoutedEventArgs e)
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
    }
}
