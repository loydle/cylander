const translations = {
  en: () => import('../../dist/translations/en.js'),
  fr: () => import('../../dist/translations/fr.js'),
  nl: () => import('../../dist/translations/nl.js'),
};

class localeConfig {
  constructor() {
    this.locale = 'en';
  }

  set locale(locale) {
    this._locale = locale;
    this._setSource();
  }

  async _setSource() {
    try {
      const module = await translations[this._locale]();
      this._source = module.default;
    } catch (error) {
      console.error(error);
    }
  }

  msg(key) {
    return this._source[key];
  }
}

export default new localeConfig();
