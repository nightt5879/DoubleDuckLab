type I18nText = {
  zh?: string;
  en?: string;
};

export function pickI18nText(value: string | I18nText | undefined, lang: 'zh' | 'en'): string {
  if (!value) {
    return '';
  }
  if (typeof value === 'string') {
    return value;
  }
  const preferred = value[lang];
  if (preferred && preferred.trim()) {
    return preferred.trim();
  }
  if (value.zh && value.zh.trim()) {
    return value.zh.trim();
  }
  return (value.en || '').trim();
}
