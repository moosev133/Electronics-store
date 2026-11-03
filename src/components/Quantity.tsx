import { Icon } from './Icon';
export function Quantity({
  value,
  onChange,
  label = 'כמות',
}: {
  value: number;
  onChange: (value: number) => void;
  label?: string;
}) {
  return (
    <div className="quantity" role="group" aria-label={label}>
      <button
        onClick={() => onChange(value - 1)}
        disabled={value <= 1}
        aria-label={`הפחתת ${label}`}
      >
        <Icon name="minus" size={16} />
      </button>
      <output aria-label={label}>{value}</output>
      <button
        onClick={() => onChange(value + 1)}
        disabled={value >= 99}
        aria-label={`הגדלת ${label}`}
      >
        <Icon name="plus" size={16} />
      </button>
    </div>
  );
}
