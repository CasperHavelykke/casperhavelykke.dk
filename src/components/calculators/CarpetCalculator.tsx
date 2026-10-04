import { useId, useState } from 'react';
import NumberField from './NumberField';
import { ceilClean, formatters, readNumber, type Lang } from './utils';

interface Props {
  lang: Lang;
  /** Product name shown above the fields. */
  product: string;
  /** Price per square metre in DKK. */
  pricePerM2: number;
  /** The roll widths the carpet comes in, in centimetres. */
  widths: number[];
}

const copy = {
  da: {
    perM2: 'pr. m²',
    width: 'Rullebredde',
    length: 'Længde (cm)',
    area: 'Areal',
    billed: (m2: string) => `afregnes som ${m2} m²`,
    total: 'Total',
    rule: 'Sælges kun i fuld rullebredde.',
    incomplete: 'Skriv længden for at se prisen.',
  },
  en: {
    perM2: 'per m²',
    width: 'Roll width',
    length: 'Length (cm)',
    area: 'Area',
    billed: (m2: string) => `charged as ${m2} m²`,
    total: 'Total',
    rule: 'Sold in the full roll width only.',
    incomplete: 'Enter the length to see the price.',
  },
} satisfies Record<Lang, unknown>;

const lengthLimits = { min: 50, max: 3000, unit: 'cm' };

/**
 * Wall-to-wall carpet is cut from a roll: the customer picks a roll width and
 * a length, and the cart gets the area in whole square metres.
 */
export default function CarpetCalculator({ lang, product, pricePerM2, widths }: Props) {
  const text = copy[lang];
  const format = formatters(lang);
  const id = useId();

  const [widthCm, setWidthCm] = useState(widths[0]);
  const [lengthRaw, setLengthRaw] = useState('315');
  const length = readNumber(lengthRaw, lengthLimits, lang);

  const result =
    length.value !== null
      ? (() => {
          const widthM = widthCm / 100;
          const lengthM = length.value / 100;
          const area = widthM * lengthM;
          const billed = ceilClean(area);
          return { widthM, lengthM, area, billed, total: billed * pricePerM2 };
        })()
      : null;

  return (
    <div className="my-8 rounded-[4px] border-[1.5px] border-line p-5 sm:p-6">
      <p className="font-bold text-ink-strong">{product}</p>
      <p className="text-sm text-muted">
        {format.money.format(pricePerM2)} {text.perM2}
      </p>

      <div className="mt-4 grid items-start gap-4 sm:grid-cols-2">
        <fieldset>
          <legend className="text-sm text-muted">{text.width}</legend>
          <div className="mt-1 flex gap-2">
            {widths.map((width) => (
              <label
                key={width}
                className="flex-1 cursor-pointer rounded-[4px] border-[1.5px] border-line px-3 py-2 text-center text-xl text-ink-strong has-[:checked]:border-ink-strong has-[:checked]:bg-glaze has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent"
              >
                <input
                  type="radio"
                  name={`${id}-width`}
                  value={width}
                  checked={widthCm === width}
                  onChange={() => setWidthCm(width)}
                  className="sr-only"
                />
                {format.plain(width / 100)} m
              </label>
            ))}
          </div>
        </fieldset>
        <NumberField id={`${id}-length`} label={text.length} raw={lengthRaw} field={length} onChange={setLengthRaw} />
      </div>
      <p className="mt-2 text-sm text-muted">{text.rule}</p>

      <output htmlFor={`${id}-length`} aria-live="polite" className="mt-5 block border-t border-line pt-4">
        {result ? (
          <>
            <span className="block text-sm text-muted">
              {text.area}: {format.decimal.format(result.widthM)} m × {format.decimal.format(result.lengthM)} m ={' '}
              {format.decimal.format(result.area)} m², {text.billed(String(result.billed))}
            </span>
            <span className="mt-2 block">
              <span className="sr-only">{text.total}: </span>
              <span className="text-2xl font-bold text-ink-strong">{format.money.format(result.total)}</span>
            </span>
          </>
        ) : (
          <span className="text-muted">{text.incomplete}</span>
        )}
      </output>
    </div>
  );
}
