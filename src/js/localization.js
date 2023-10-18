class localization {
  set locale(locale) {
    this._locale = locale;
  }

  get locale() {
    return this._locale;
  }
}

/**
 * Temporary helper in setting the locale before
 * the creation of a menu where language could be changed in-app.
 */
export function getLocale() {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get('lang');
}

export default new localization();
