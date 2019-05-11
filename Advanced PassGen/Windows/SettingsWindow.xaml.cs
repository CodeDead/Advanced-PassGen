using System;
using System.ComponentModel;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
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
                TxtCharacterSet.Text = Properties.Settings.Default.CharacterSet;

                if (Properties.Settings.Default.WindowDragging)
                {
                    // Remove previously set event handler if applicable
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
        /// Method that will be called when the Reset button has been clicked
        /// </summary>
        /// <param name="sender">The object that called this method</param>
        /// <param name="e">The routed event arguments</param>
        private void BtnReset_Click(object sender, RoutedEventArgs e)
        {
            Properties.Settings.Default.Reset();
            Properties.Settings.Default.Save();

            LoadSettings();
            ChangeVisualStyle();

            _mw.ChangeVisualStyle();
            _mw.LoadSettings();
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
                Properties.Settings.Default.CharacterSet = TxtCharacterSet.Text;
                _mw.TxtCharacterSet.Text = TxtCharacterSet.Text;

                Properties.Settings.Default.Save();

                LoadSettings();
                ChangeVisualStyle();

                _mw.ChangeVisualStyle();
                _mw.LoadSettings();
            }
            catch (Exception ex)
            {
                MessageBox.Show(this, ex.Message, "Advanced PassGen", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        /// <summary>
        /// Method that is called when the border thickness should change
        /// </summary>
        /// <param name="sender">The object that called this method</param>
        /// <param name="e">The RoutedPropertyChangedEventArgs</param>
        private void SldBorderThickness_OnValueChanged(object sender, RoutedPropertyChangedEventArgs<double> e)
        {
            BorderThickness = new Thickness(((Slider)sender).Value);
        }

        /// <summary>
        /// Method that is called when the opacity should change dynamically
        /// </summary>
        /// <param name="sender">The object that called this method</param>
        /// <param name="e">The RoutedPropertyChangedEventArgs</param>
        private void SldOpacity_OnValueChanged(object sender, RoutedPropertyChangedEventArgs<double> e)
        {
            Opacity = ((Slider)sender).Value / 100;
        }

        /// <summary>
        /// Method  that is called when the ResizeBorderThickness should change dynamically
        /// </summary>
        /// <param name="sender">The object that called this method</param>
        /// <param name="e">The RoutedPropertyChangedEventArgs</param>
        private void SldWindowResize_OnValueChanged(object sender, RoutedPropertyChangedEventArgs<double> e)
        {
            ResizeBorderThickness = new Thickness(((Slider)sender).Value);
        }

        /// <summary>
        /// Method that is called when the theme should be previewed
        /// </summary>
        /// <param name="sender">The object that called this method</param>
        /// <param name="e">The SelectionChangedEventArgs</param>
        private void Selector_OnSelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            ChangeVisualStyle();
        }

        /// <summary>
        /// Method that is called when the SettingsWindow is closing
        /// </summary>
        /// <param name="sender">The object that called this method</param>
        /// <param name="e"></param>
        private void SettingsWindow_OnClosing(object sender, CancelEventArgs e)
        {
            try
            {
                Properties.Settings.Default.Reload();
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message, "Advanced PassGen", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }
    }
}
