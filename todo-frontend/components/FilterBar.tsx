'use client';

import { Filter } from '@/types/Filter';
import { SortOrder } from '@/hooks/useTasks';
import { Button } from '@/components/ui/button';

interface Props {
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
  sortOrder: SortOrder;
  onSortOrderChange: (sortOrder: SortOrder) => void;
}

const filters: { label: string; value: Filter }[] = [
  { label: 'All', value: Filter.All },
  { label: 'Complited', value: Filter.Done },
  { label: 'Uncomplited', value: Filter.Undone },
];

export const FilterBar: React.FC<Props> = ({ filter, onFilterChange, sortOrder, onSortOrderChange }) => (
  <div className="flex flex-wrap items-center justify-between gap-3 py-3">
    <div className="flex gap-1">
      {filters.map(f => (
        <Button
          key={f.value}
          variant={filter === f.value ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onFilterChange(f.value)}
        >
          {f.label}
        </Button>
      ))}
    </div>

    <div className="flex items-center gap-1 text-sm text-muted-foreground">
      <span>Priority:</span>
      <Button
        variant={sortOrder === 'asc' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onSortOrderChange(sortOrder === 'asc' ? null : 'asc')}
      >
        ↑
      </Button>
      <Button
        variant={sortOrder === 'desc' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onSortOrderChange(sortOrder === 'desc' ? null : 'desc')}
      >
        ↓
      </Button>
    </div>
  </div>
);