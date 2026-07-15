'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Props {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

export const PrioritySelect: React.FC<Props> = ({ value, onChange, disabled }) => {
  return (
    <Select value={String(value)} onValueChange={v => onChange(Number(v))} disabled={disabled}>
      <SelectTrigger className="w-[90px]">
        <SelectValue placeholder="Priority" />
      </SelectTrigger>
      <SelectContent>
        {Array.from({ length: 10 }, (_, i) => i + 1).map(p => (
          <SelectItem key={p} value={String(p)}>
            {p}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};