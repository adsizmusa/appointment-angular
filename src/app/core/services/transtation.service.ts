import { Injectable } from '@angular/core';
import localeEn from '@angular/common/locales/en-GB';
import localeDa from '@angular/common/locales/da';
import localeDe from '@angular/common/locales/de';
import localeSe from '@angular/common/locales/sv';
import localeTr from '@angular/common/locales/tr';
import localeNo from '@angular/common/locales/nb';
import { loadMessages, locale } from 'devextreme/localization';
import { registerLocaleData } from '@angular/common';
import { logWarnings } from 'protractor/built/driverProviders';
import { TranslateService } from '@ngx-translate/core';
import trMessages from 'devextreme/localization/messages/tr.json';
import trMessagesCostum from '../../messages/tr.json';

@Injectable({
  providedIn: 'root',
})
export class TranstationService {
  constructor(private ngxTranslate: TranslateService) {}

  public language: string = 'tr';
  private _locale: string;

  public getLocale(): string {
    switch (this.language) {
      case 'da':
        this._locale = 'da-DK';
        break;
      case 'tr':
        this._locale = 'tr-TR';
        break;
      case 'no':
        this._locale = 'nb-NO';
        break;
      case 'se':
        this._locale = 'sv-SE';
        break;
      case 'de':
        this._locale = 'de-DE';
        break;
      default:
        this._locale = 'en-GB';
        break;
    }

    return this._locale;
  }
  public setLanguage(language: string) {
    const me = this;

    if (language == null) {
      return;
    }

    locale(language);

    me.ngxTranslate.setDefaultLang(language);
    me.ngxTranslate.use(language);
    me.registerCulture(language);

    loadMessages(trMessages);
    loadMessages(trMessagesCostum);
  }

  public registerCulture(language: string) {
    const me = this;

    if (language == null) {
      return;
    }

    me.language = language;

    switch (language) {
      case 'en-GB': {
        registerLocaleData(localeEn, me._locale);
        break;
      }
      case 'da': {
        registerLocaleData(localeDa, me._locale);
        break;
      }
      case 'de': {
        registerLocaleData(localeDe, me._locale);
        break;
      }
      case 'tr': {
        registerLocaleData(localeTr, me._locale);
        break;
      }
      case 'no': {
        registerLocaleData(localeNo, me._locale);
        break;
      }
      case 'se': {
        registerLocaleData(localeSe, me._locale);
        break;
      }
    }
  }
}
