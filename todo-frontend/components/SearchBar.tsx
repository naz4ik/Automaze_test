'use client';

import { Input } from '@/components/ui/input';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar: React.FC<Props> = ({ value, onChange }) => (
  <Input
    placeholder="Searching results..."
    value={value}
    onChange={e => onChange(e.target.value)}
    className="max-w-xs"
  />
);