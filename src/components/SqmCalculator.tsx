import { useId, useState } from 'react';

type Lang = 'da' | 'en';

interface Props {
  lang: Lang;
  /** Product name shown above the fields. */
  product: string;
  /** Price per square metre in DKK. */
  pricePerSqm: number;
  /** Smallest area the shop sells, in m². */
  minArea?: number;
  /** Allowed length of each side, in cm. */
  minSide?: number;
  maxSide?: number;
}

const copy = {
  da: {
    locale: 'da-DK',
    width: 'Bredde',
    length: 'Længde',
    perSqm: 'pr. m²',
    area: 'Areal',
    price: 'Pris',
    minArea: (area: string) => `Mindste areal er ${area} m², så prisen beregnes ud fra det.`,
    incomplete: 'Skriv bredde og længde for at se prisen.',
    notNumber: 'Skriv et tal i centimeter, fx 240.',
    outOfRange: (min: number, max: number) => `Skriv et tal mellem ${min} og ${max} cm.`,
  },
  en: {
    locale: 'en-GB',
    width: 'Width',
    length: 'Length',
    perSqm: 'per m²',
    area: 'Area',
    price: 'Price',
    minArea: (area: string) => `The minimum area is ${area} m², so the price is based on that.`,
    incomplete: 'Enter width and length to see the price.',
    notNumber: 'Enter a number in centimetres, e.g. 240.',
    outOfRange: (min: number, max: number) => `Enter a number between ${min} and ${max} cm.`,
  },
} satisfies Record<Lang, unknown>;

type Field = { value: number | null; error: string | null };

/** Accepts both decimal commas and points, since Danish keyboards type commas. */
function parseSide(input: string, min: number, max: number, text: (typeof copy)[Lang]): Field {
  const trimmed = input.trim();
  if (trimmed === '') return { value: null, error: null };

  const value = Number(trimmed.replace(',', '.'));
  if (!Number.isFinite(value)) return { value: null, error: text.notNumber };
  if (value < min || value > max) return { value: null, error: text.outOfRange(min, max) };
  return { value, error: null };
}

export default function SqmCalculator({
  lang,
  product,
  pricePerSqm,
  minArea = 1,
  minSide = 20,
  maxSide = 500,
}: Props) {
  const text = copy[lang];
  const id = useId();
  const [width, setWidth] = useState('240');
  const [length, setLength] = useState('315');

  const decimal = new Intl.NumberFormat(text.locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const money = new Intl.NumberFormat(text.locale, { style: 'currency', currency: 'DKK' });

  const fields = [
    { key: 'width', label: text.width, raw: width, set: setWidth, ...parseSide(width, minSide, maxSide, text) },
    { key: 'length', label: text.length, raw: length, set: setLength, ...parseSide(length, minSide, maxSide, text) },
  ];

  const [w, l] = fields.map((field) => field.value);
  const result = w !== null && l !== null ? calculate(w, l) : null;

  function calculate(widthCm: number, lengthCm: number) {
    // Billed in whole hundredths of a square metre, rounded up.
    const area = Math.ceil((widthCm * lengthCm) / 100) / 100;
    const billed = Math.max(area, minArea);
    return { widthM: widthCm / 100, lengthM: lengthCm / 100, area, billed, price: Math.round(billed * pricePerSqm * 100) / 100 };
  }

  return (
    <div className="my-8 rounded-[4px] border-[1.5px] border-line p-5 sm:p-6">
      <p className="font-bold text-ink-strong">
        {product}, {money.format(pricePerSqm)} {text.perSqm}
      </p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {fields.map((field) => {
          const inputId = `${id}-${field.key}`;
          const errorId = `${inputId}-error`;
          return (
            <div key={field.key}>
              <label htmlFor={inputId} className="block text-sm text-muted">
                {field.label} (cm)
              </label>
              <input
                id={inputId}
                type="text"
                inputMode="decimal"
                autoComplete="off"
                value={field.raw}
                onChange={(event) => field.set(event.target.value)}
                aria-invalid={field.error ? true : undefined}
                aria-describedby={field.error ? errorId : undefined}
                className="mt-1 w-full rounded-[4px] border-[1.5px] border-line bg-paper px-3 py-2 text-xl tabular-nums text-ink-strong aria-[invalid=true]:border-ink-strong"
              />
              {field.error && (
                <p id={errorId} className="mt-1 text-sm font-semibold text-ink-strong">
                  {field.error}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <output htmlFor={`${id}-width ${id}-length`} aria-live="polite" className="mt-6 block border-t border-line pt-4">
        {result ? (
          <>
            <span className="block text-sm text-muted">
              {text.area}: {decimal.format(result.widthM)} m × {decimal.format(result.lengthM)} m ={' '}
              {decimal.format(result.area)} m²
            </span>
            {result.billed > result.area && (
              <span className="mt-1 block text-sm text-muted">{text.minArea(decimal.format(minArea))}</span>
            )}
            <span className="mt-2 block">
              <span className="sr-only">{text.price}: </span>
              <span className="text-2xl font-bold text-ink-strong">{money.format(result.price)}</span>
            </span>
          </>
        ) : (
          <span className="text-muted">{text.incomplete}</span>
        )}
      </output>
    </div>
  );
}
