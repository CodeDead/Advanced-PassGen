using System;
using System.IO;
using System.Net;
using System.Windows;
using System.Xml.Serialization;

namespace Advanced_PassGen.Classes
{
    internal class UpdateManager
    {
        private readonly string _updateUrl;
        private Update _update;


        internal UpdateManager(string updateUrl)
        {
            _updateUrl = updateUrl;
            _update = new Update();
        }

        /// <summary>
        /// Check if there are updates available for the program.
        /// </summary>
        internal async void CheckForUpdate(bool showErrors, bool showNoUpdates)
        {
            try
            {
                WebClient wc = new WebClient();
                string xml = await wc.DownloadStringTaskAsync(_updateUrl);

                XmlSerializer serializer = new XmlSerializer(_update.GetType());
                using (MemoryStream stream = new MemoryStream())
                {
                    StreamWriter writer = new StreamWriter(stream);
                    writer.Write(xml);
                    writer.Flush();
                    stream.Position = 0;
                    _update = (Update)serializer.Deserialize(stream);
                    writer.Dispose();
                }


                if (_update.CheckForUpdate())
                {
                    if (MessageBox.Show("Version " + _update.GetUpdateVersion() + " is now available!" + Environment.NewLine + "Would you like to download this version?", "Advanced PassGen", MessageBoxButton.YesNo, MessageBoxImage.Question) == MessageBoxResult.Yes)
                    {
                        System.Diagnostics.Process.Start(_update.UpdateUrl);
                    }
                }
                else
                {
                    if (showNoUpdates)
                    {
                        MessageBox.Show("No updates are currently available", "Advanced PassGen", MessageBoxButton.OK, MessageBoxImage.Information);
                    }
                }
            }
            catch (Exception ex)
            {
                if (showErrors)
                {
                    MessageBox.Show(ex.Message, "Advanced PassGen", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }
        }
    }
}
