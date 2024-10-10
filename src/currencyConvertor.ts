// 30개
export const languageCurrencyMap: {
  [key: string]: string;
} = {
  'en-US': 'USD', // 미국 - 미국 달러
  'zh-CN': 'CNY', // 중국 - 중국 위안
  'ja-JP': 'JPY', // 일본 - 일본 엔
  'ko-KR': 'KRW', // 한국 - 대한민국 원
  'es-ES': 'EUR', // 스페인 - 유럽 유로
  'fr-FR': 'EUR', // 프랑스 - 유럽 유로
  'de-DE': 'EUR', // 독일 - 유럽 유로
  'it-IT': 'EUR', // 이탈리아 - 유럽 유로
  'pt-PT': 'EUR', // 포르투갈 - 유럽 유로
  'nl-NL': 'EUR', // 네덜란드 - 유럽 유로
  'sv-SE': 'SEK', // 스웨덴 - 스웨덴 크로나
  'da-DK': 'DKK', // 덴마크 - 덴마크 크로네
  'no-NO': 'NOK', // 노르웨이 - 노르웨이 크로네
  'fi-FI': 'EUR', // 핀란드 - 유럽 유로
  'ru-RU': 'RUB', // 러시아 - 러시아 루블
  'tr-TR': 'TRY', // 터키 - 터키 리라
  'ar-SA': 'SAR', // 사우디 아라비아 - 사우디 리얄
  'hi-IN': 'INR', // 인도 - 인도 루피
  'bn-BD': 'BDT', // 방글라데시 - 방글라데시 티카
  'ur-PK': 'PKR', // 파키스탄 - 파키스탄 루피
  'id-ID': 'IDR', // 인도네시아 - 인도네시아 루피아
  'ms-MY': 'MYR', // 말레이시아 - 말레이시아 링깃
  'th-TH': 'THB', // 태국 - 태국 바트
  'vi-VN': 'VND', // 베트남 - 베트남 동
  'fil-PH': 'PHP', // 필리핀 - 필리핀 페소
  'hu-HU': 'HUF', // 헝가리 - 헝가리 포린트
  'pl-PL': 'PLN', // 폴란드 - 폴란드 즈워티
  'cs-CZ': 'CZK', // 체코 - 체코 코루나
  'af-ZA': 'ZAR', // 남아프리카 - 남아프리카 공화국 랜드
  'sw-KE': 'KES', // 케냐 - 케냐 실링
  // 언어-위치 형태로 매치되지 않을 수도 있음
  en: 'USD', // 미국 - 미국 달러
  zh: 'CNY', // 중국 - 중국 위안
  ja: 'JPY', // 일본 - 일본 엔
  ko: 'KRW', // 한국 - 대한민국 원
  es: 'EUR', // 스페인 - 유럽 유로
  fr: 'EUR', // 프랑스 - 유럽 유로
  de: 'EUR', // 독일 - 유럽 유로
  it: 'EUR', // 이탈리아 - 유럽 유로
  pt: 'EUR', // 포르투갈 - 유럽 유로
  nl: 'EUR', // 네덜란드 - 유럽 유로
  sv: 'SEK', // 스웨덴 - 스웨덴 크로나
  da: 'DKK', // 덴마크 - 덴마크 크로네
  no: 'NOK', // 노르웨이 - 노르웨이 크로네
  fi: 'EUR', // 핀란드 - 유럽 유로
  ru: 'RUB', // 러시아 - 러시아 루블
  tr: 'TRY', // 터키 - 터키 리라
  ar: 'SAR', // 사우디 아라비아 - 사우디 리얄
  hi: 'INR', // 인도 - 인도 루피
  bn: 'BDT', // 방글라데시 - 방글라데시 티카
  ur: 'PKR', // 파키스탄 - 파키스탄 루피
  id: 'IDR', // 인도네시아 - 인도네시아 루피아
  ms: 'MYR', // 말레이시아 - 말레이시아 링깃
  th: 'THB', // 태국 - 태국 바트
  vi: 'VND', // 베트남 - 베트남 동
  fil: 'PHP', // 필리핀 - 필리핀 페소
  hu: 'HUF', // 헝가리 - 헝가리 포린트
  pl: 'PLN', // 폴란드 - 폴란드 즈워티
  cs: 'CZK', // 체코 - 체코 코루나
  af: 'ZAR', // 남아프리카 - 남아프리카 공화국 랜드
  sw: 'KES', // 케냐 - 케냐 실링
} as const;
export type Currency =
  (typeof languageCurrencyMap)[keyof typeof languageCurrencyMap];
export interface Options {
  withSign: boolean;
  signType: 'localized' | 'default';
  currency: Currency;
  rootLanguage: Currency;
}
export function isCurrency(value: any): value is Currency {
  return Object.keys(languageCurrencyMap).includes(value);
}

export default function currencyConvertor(value: number, options: Options) {
  let w = window;
  if (typeof w !== 'object') return '';
  const withSign = options?.withSign;
  const currency = options?.currency;
  const signType = options?.signType;
  let rootLanguage = options?.rootLanguage || 'ko-KR';

  const languages = w.navigator.languages || [rootLanguage];
  const preferenceLanguageAndLocale = languages[0] as Currency;

  if (!isCurrency(preferenceLanguageAndLocale)) {
    console.error('지원하지 않는 언어입니다.');
  }
  let formatted = Intl.NumberFormat(preferenceLanguageAndLocale, {
    style: 'currency',
    currencyDisplay: 'narrowSymbol',
    currencySign: 'accounting',
    currency: currency
      ? currency
      : languageCurrencyMap[preferenceLanguageAndLocale] ||
        languageCurrencyMap?.[rootLanguage],
  }).format(value);

  if (withSign) {
    switch (signType) {
      case 'localized':
        if (currency === 'KRW') {
          formatted = formatted.replace('₩', '') + '원';
        }
        break;
      case 'default':
      default:
        break;
    }
    return formatted;
  }

  const matches = formatted.match(/[\d,]+/g);
  return matches ? matches.join('') : formatted;
}
