const Updater = (os, currentVersion) => {
  /**
   * Check whether version b is newer than version a
   * @param a Version a
   * @param b Version b
   * @returns {boolean} True if version b is newer than version a, otherwise false
   */
  const isNewer = (a, b) => {
    const partsA = a.split('.');
    const partsB = b.split('.');
    const numParts =
      partsA.length > partsB.length ? partsA.length : partsB.length;

    for (let i = 0; i < numParts; i += 1) {
      if ((parseInt(partsB[i], 10) || 0) !== (parseInt(partsA[i], 10) || 0)) {
        return (parseInt(partsB[i], 10) || 0) > (parseInt(partsA[i], 10) || 0);
      }
    }

    return false;
  };

  /**
   * Parse the information inside an external update
   * @param update The update data
   * @returns {{infoUrl: null, updateUrl: boolean, downloadUrl: null, version: null}}
   */
  const parseUpdate = (update) => {
    const platform = update.platforms[os];
    const data = {
      updateUrl: false,
      downloadUrl: null,
      infoUrl: null,
      version: null,
    };

    if (
      isNewer(
        currentVersion,
        `${platform.version.majorVersion}.${platform.version.minorVersion}.${platform.version.buildVersion}.${platform.version.revisionVersion}`,
      )
    ) {
      data.updateAvailable = true;
    }

    data.updateUrl = platform.updateUrl;
    data.infoUrl = platform.infoUrl;
    data.version = `${platform.version.majorVersion}.${platform.version.minorVersion}.${platform.version.buildVersion}.${platform.version.revisionVersion}`;

    return data;
  };

  return new Promise((resolve, reject) => {
    fetch('https://codedead.com/Software/Advanced%20PassGen/version.json')
      .then((res) => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => resolve(parseUpdate(data)))
      .catch((error) => reject(error.toString()));
  });
};

export default Updater;
