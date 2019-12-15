// import RNLanguages from 'react-native-languages';
import React from "react";
import {I18nManager} from 'react-native'
import * as RNLocalize from "react-native-localize";
import i18n from "i18n-js";
import memoize from "lodash.memoize";
const translationGetters = {
  // lazy requires (metro bundler does not support symlinks)
  en: () => require("./translations/en.json"),
  ar: () => require("./translations/ar.json"),
};
export const string = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key),
);
export const setI18nConfig = (language='en',showRTL=false) => {
  // fallback if no available language fits
  const fallback = { languageTag: language, isRTL: showRTL };
  const { languageTag, isRTL } =
    // RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
    fallback;
  // clear translation cache
  string.cache.clear();
  // update layout direction
  I18nManager.forceRTL(isRTL);
  // set i18n-js config
  i18n.translations = { [languageTag]: translationGetters[languageTag]() };
  i18n.locale = languageTag;
};





