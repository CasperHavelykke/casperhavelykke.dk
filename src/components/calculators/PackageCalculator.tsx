import { useId, useState } from 'react';
import NumberField from './NumberField';
import { ceilClean, formatters, readNumber, type Lang } from './utils';

interface Props {
  lang: Lang;
  /** Product name shown above the fields. */
  product: string;
  /** Square metres in one package. */
  packM2: number;
  /** Price of one package in DKK. */
  pricePerPack: number;
}

const copy = {
  da: {
    perPack: 'pr. pakke',
    perM2: 'pr. m²',
    packs: 'Antal pakker',
    m2: 'Kvadratmeter',
    total: 'Total',
    rule: (m2: string) => `1 pakke = ${m2} m². Sælges kun i hele pakker.`,
    incomplete: 'Skriv antal pakker eller kvadratmeter for at se prisen.',
  },
  en: {
    perPack: 'per package',
    perM2: 'per m²',
    packs: 'Packages',
    m2: 'Square metres',
    total: 'Total',
    rule: (m2: string) => `1 package = ${m2} m². Sold in whole packages only.`,
    incomplete: 'Enter packages or square metres to see the price.',
  },
} satisfies Record<Lang, unknown>;

const packLimits = { min: 1, max: 500, integer: true };
const m2Limits = { min: 0.01, max: 1000, unit: 'm²' };

/**
 * Two linked fields, as on the store's product pages: typing square metres
 * rounds up to whole packages, and changing packages shows the area you get.
 */
export default function PackageCalculator({ lang, product, packM2, pricePerPack }: Props) {
  const text = copy[lang];
  const format = formatters(lang);
  const id = useId();

  const [packsRaw, setPacksRaw] = useState('4');
  const [m2Raw, setM2Raw] = useState(format.plain(4 * packM2));

  const packs = readNumber(packsRaw, packLimits, lang);
  const m2 = readNumber(m2Raw, m2Limits, lang);

  function changeM2(raw: string) {
    setM2Raw(raw);
    const field = readNumber(raw, m2Limits, lang);
    if (field.value !== null) setPacksRaw(String(ceilClean(field.value / packM2)));
  }

  function changePacks(raw: string) {
    setPacksRaw(raw);
    const field = readNumber(raw, packLimits, lang);
    if (field.value !== null) setM2Raw(format.plain(field.value * packM2));
  }

  const total = packs.value !== null && m2.value !== null ? packs.value * pricePerPack : null;

  return (
    <div className="my-8 rounded-[4px] border-[1.5px] border-line p-5 sm:p-6">
      <p className="font-bold text-ink-strong">{product}</p>
      <p className="text-sm text-muted">
        {format.money.format(pricePerPack)} {text.perPack}, {format.money.format(pricePerPack / packM2)} {text.perM2}
      </p>

      <div className="mt-4 grid items-start gap-4 sm:grid-cols-2">
        <NumberField id={`${id}-m2`} label={text.m2} raw={m2Raw} field={m2} onChange={changeM2} />
        <NumberField id={`${id}-packs`} label={text.packs} raw={packsRaw} field={packs} onChange={changePacks} />
      </div>
      <p className="mt-2 text-sm text-muted">{text.rule(format.plain(packM2))}</p>

      <output htmlFor={`${id}-m2 ${id}-packs`} aria-live="polite" className="mt-5 block border-t border-line pt-4">
        {total !== null ? (
          <span className="block">
            <span className="block text-sm text-muted">{text.total}</span>
            <span className="text-2xl font-bold text-ink-strong">{format.money.format(total)}</span>
          </span>
        ) : (
          <span className="text-muted">{text.incomplete}</span>
        )}
      </output>
    </div>
  );
}
