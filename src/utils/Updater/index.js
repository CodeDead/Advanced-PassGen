const normalizeVersion = (version) =>
  typeof version === 'string' ? version.replace(/^[^\d]+/, '') : '';

const normalizeArch = (architecture) => {
  switch (architecture) {
    case 'x86_64':
      return 'x64';
    default:
      return architecture;
  }
};

const Updater = (os, architecture, currentVersion) => {
  /**
   * Check whether version b is newer than version a
   * @param a Version a
   * @param b Version b
   * @returns {boolean} True if version b is newer than version a, otherwise false
   */
  const isNewer = (a, b) => {
    const partsA = normalizeVersion(a).split('.');
    const partsB = normalizeVersion(b).split('.');
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
   * @returns {{infoUrl: null, updateUrl: null, downloadUrl: null, version: null, updateAvailable: boolean}}
   */
  const parseUpdate = (update) => {
    const data = {
      updateUrl: null,
      downloadUrl: null,
      infoUrl: null,
      version: null,
      updateAvailable: false,
    };

    if (!update || !Array.isArray(update.platforms)) {
      return data;
    }

    const normalizedArchitecture = normalizeArch(architecture);
    const matchingPlatforms = update.platforms.filter(
      (platform) => platform.name === os,
    );
    const platform = matchingPlatforms.find(
      (entry) => normalizeArch(entry.arch) === normalizedArchitecture,
    );
    const version = normalizeVersion(update.semver);

    if (!platform || !version) {
      return data;
    }

    if (isNewer(currentVersion, version)) {
      data.updateAvailable = true;
    }

    data.updateUrl = platform.downloadUrl;
    data.downloadUrl = platform.downloadUrl;
    data.infoUrl = platform.infoUrl;
    data.version = version;

    return data;
  };

  return new Promise((resolve, reject) => {
    fetch(
      'https://api.codedead.com/api/v1/version/38b1f6e7-3274-4405-9eb1-42d47ae8a53e',
    )
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
