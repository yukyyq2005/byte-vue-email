
import { LANGUAGE_ar_MAP } from './language_ar';
import { LANGUAGE_cn_MAP } from './language_cn';
import { LANGUAGE_da_MAP } from './language_da';
import { LANGUAGE_de_MAP } from './language_de';
import { LANGUAGE_es_MAP } from './language_es';
import { LANGUAGE_fr_MAP } from './language_fr';
import { LANGUAGE_hi_MAP } from './language_hi';
import { LANGUAGE_it_MAP } from './language_it';
import { LANGUAGE_ja_MAP } from './language_ja';
import { LANGUAGE_ko_MAP } from './language_ko';
import { LANGUAGE_nl_MAP } from './language_nl';
import { LANGUAGE_pl_MAP } from './language_pl';
import { LANGUAGE_pt_MAP } from './language_pt';
import { LANGUAGE_ro_MAP } from './language_ro';
import { LANGUAGE_ru_MAP } from './language_ru';
import { LANGUAGE_th_MAP } from './language_th';
import { LANGUAGE_tr_MAP } from './language_tr';
import { LANGUAGE_tw_MAP } from './language_tw';
// let locale = Session.getActiveUserLocale();

const languageMaps = {
    ar: LANGUAGE_ar_MAP,
    cn: LANGUAGE_cn_MAP,
    da: LANGUAGE_da_MAP,
    de: LANGUAGE_de_MAP,
    es: LANGUAGE_es_MAP,
    fr: LANGUAGE_fr_MAP,
    hi: LANGUAGE_hi_MAP,
    it: LANGUAGE_it_MAP,
    ja: LANGUAGE_ja_MAP,
    ko: LANGUAGE_ko_MAP,
    nl: LANGUAGE_nl_MAP,
    pl: LANGUAGE_pl_MAP,
    pt: LANGUAGE_pt_MAP,
    ro: LANGUAGE_ro_MAP,
    ru: LANGUAGE_ru_MAP,
    th: LANGUAGE_th_MAP,
    tr: LANGUAGE_tr_MAP,
    tw: LANGUAGE_tw_MAP,
};

//如果有特殊处理，同时也要处理函数changeLanguage
export function translateLocale(key, locale) {
    // console.log('translateLocale ',locale)
    switch (locale) {
        case "en":
        return key
        case 'zh_CN':
        return LANGUAGE_cn_MAP[key] || key
        case "zh_TW":
        case 'zh_HK':
        return LANGUAGE_tw_MAP[key] || key
        default:
            if(locale?.startsWith('pt')){//pt_PT pt_BR
                return LANGUAGE_pt_MAP[key] || key
            }
        return languageMaps[locale]?.[key] || key
    }
}