import { locales } from '../configs/localeConfig.js';

const getTranslationFile = (locale) =>
  import(`../../dist/translations/${locale}.js`);

class localization {
  constructor() {
    this.locale = 'en';
  }

  set locale(locale) {
    if (!locales.includes(locale)) {
      return;
    }
    this._locale = locale;
    this._setSource();
  }

  async _setSource() {
    try {
      const module = await getTranslationFile(this._locale);
      this._source = module.default;
    } catch (error) {
      console.error(error);
    }
  }

  msg(key) {
    const keyTree = key.split('.');
    const result = keyTree.reduce((parent, key) => parent[key], this._source);
    return result;
  }
}

export function getLocale() {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get('lang');
}

export default new localization();
