using System;
using System.Windows;
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
                ChbAutoUpdate.IsChecked = Properties.Settings.Default.AutoUpdate;
                ChbPasswordStrength.IsChecked = Properties.Settings.Default.ShowPasswordStrength;
                TxtCharacterSet.Text = Properties.Settings.Default.CharacterSet;

                if (Properties.Settings.Default.WindowDragging)
                {
                    MouseDown += OnMouseDown;
                    ChbWindowDraggable.IsChecked = true;
                }
                else
                {
                    MouseDown -= OnMouseDown;
                    ChbWindowDraggable.IsChecked = false;
                }

                ChbStyle.SelectedValue = Properties.Settings.Default.VisualStyle;
                CpMetroBrush.Color = Properties.Settings.Default.MetroColor;
                SldBorderThickness.Value = Properties.Settings.Default.BorderThickness;
                SldOpacity.Value = Properties.Settings.Default.WindowOpacity * 100;
                SldWindowResize.Value = Properties.Settings.Default.WindowResizeBorder;

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
                if (ChbAutoUpdate.IsChecked != null) Properties.Settings.Default.AutoUpdate = ChbAutoUpdate.IsChecked.Value;
                if (ChbPasswordStrength.IsChecked != null) Properties.Settings.Default.ShowPasswordStrength = ChbPasswordStrength.IsChecked.Value;
                if (ChbWindowDraggable.IsChecked != null)Properties.Settings.Default.WindowDragging = ChbWindowDraggable.IsChecked.Value;

                Properties.Settings.Default.CharacterSet = TxtCharacterSet.Text;
                _mw.TxtCharacterSet.Text = TxtCharacterSet.Text;

                Properties.Settings.Default.VisualStyle = ChbStyle.Text;
                Properties.Settings.Default.MetroColor = CpMetroBrush.Color;
                Properties.Settings.Default.BorderThickness = SldBorderThickness.Value;
                Properties.Settings.Default.WindowOpacity = SldOpacity.Value / 100;
                Properties.Settings.Default.WindowResizeBorder = SldWindowResize.Value;

                if (ChbExportLength.IsChecked != null) Properties.Settings.Default.ExportLength = ChbExportLength.IsChecked.Value;
                if (ChbExportStrength.IsChecked != null) Properties.Settings.Default.ExportStrength = ChbExportStrength.IsChecked.Value;

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
            BorderThickness = new Thickness(SldBorderThickness.Value);
        }

        /// <summary>
        /// Method that is called when the opacity should change dynamically
        /// </summary>
        /// <param name="sender">The object that called this method</param>
        /// <param name="e">The RoutedPropertyChangedEventArgs</param>
        private void SldOpacity_OnValueChanged(object sender, RoutedPropertyChangedEventArgs<double> e)
        {
            Opacity = SldOpacity.Value / 100;
        }

        /// <summary>
        /// Method  that is called when the ResizeBorderThickness should change dynamically
        /// </summary>
        /// <param name="sender">The object that called this method</param>
        /// <param name="e">The RoutedPropertyChangedEventArgs</param>
        private void SldWindowResize_OnValueChanged(object sender, RoutedPropertyChangedEventArgs<double> e)
        {
            ResizeBorderThickness = new Thickness(SldWindowResize.Value);
        }
    }
}
