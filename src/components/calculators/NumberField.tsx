import type { Field } from './utils';

interface Props {
  id: string;
  label: string;
  raw: string;
  field: Field;
  onChange: (raw: string) => void;
}

export default function NumberField({ id, label, raw, field, onChange }: Props) {
  const errorId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className="block text-sm text-muted">
        {label}
      </label>
      <input
        id={id}
        type="text"
        inputMode="decimal"
        autoComplete="off"
        value={raw}
        onChange={(event) => onChange(event.target.value)}
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
}
