export type Lang = 'da' | 'en';

const locales: Record<Lang, string> = { da: 'da-DK', en: 'en-GB' };

export function formatters(lang: Lang) {
  const locale = locales[lang];
  const plain = new Intl.NumberFormat(locale, { maximumFractionDigits: 2, useGrouping: false });
  return {
    money: new Intl.NumberFormat(locale, { style: 'currency', currency: 'DKK' }),
    decimal: new Intl.NumberFormat(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    /** For values written back into an input: no thousands separator, at most two decimals. */
    plain: (value: number) => plain.format(value),
  };
}

export type Field = { value: number | null; error: string | null };

type Limits = { min: number; max: number; integer?: boolean; unit?: string };

const errors = {
  da: {
    notNumber: 'Skriv et tal.',
    notInteger: 'Skriv et helt tal.',
    range: (min: string, max: string) => `Skriv et tal mellem ${min} og ${max}.`,
  },
  en: {
    notNumber: 'Enter a number.',
    notInteger: 'Enter a whole number.',
    range: (min: string, max: string) => `Enter a number between ${min} and ${max}.`,
  },
};

/** Reads a typed number. Accepts a decimal comma as well as a point, since Danish keyboards type commas. */
export function readNumber(raw: string, limits: Limits, lang: Lang): Field {
  const trimmed = raw.trim();
  if (trimmed === '') return { value: null, error: null };

  const text = errors[lang];
  const value = Number(trimmed.replace(',', '.'));
  if (!Number.isFinite(value)) return { value: null, error: text.notNumber };
  if (limits.integer && !Number.isInteger(value)) return { value: null, error: text.notInteger };

  if (value < limits.min || value > limits.max) {
    const { plain } = formatters(lang);
    const unit = limits.unit ? ` ${limits.unit}` : '';
    return { value: null, error: text.range(plain(limits.min), plain(limits.max) + unit) };
  }

  return { value, error: null };
}

/** Rounds up, ignoring floating-point noise such as 8.52 / 2.13 = 4.000000000000001. */
export const ceilClean = (value: number) => Math.ceil(value - 1e-9);
