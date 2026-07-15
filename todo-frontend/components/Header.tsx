'use client';

import { useState, FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PrioritySelect } from './PrioritySelect';

interface Props {
  onAdd: (title: string, priority: number, dueDate?: string) => Promise<void>;
  onToggleAll: () => void;
  isSubmitting: boolean;
  hasTasks: boolean;
  allDone: boolean;
}

export const Header: React.FC<Props> = ({ onAdd, onToggleAll, isSubmitting, hasTasks, allDone }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState(5);
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    await onAdd(title.trim(), priority, dueDate || undefined);
    setTitle('');
    setPriority(5);
    setDueDate('');
  };

  return (
    <div className="flex flex-col gap-3 p-4 border-b bg-white">
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-2">
        <Input
          placeholder="What you need to do?"
          value={title}
          onChange={e => setTitle(e.target.value)}
          disabled={isSubmitting}
          className="flex-1 min-w-[160px]"
        />
        <Input
          type="date"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
          disabled={isSubmitting}
          className="w-[150px]"
        />
        <PrioritySelect value={priority} onChange={setPriority} disabled={isSubmitting} />
        <Button type="submit" disabled={isSubmitting || !title.trim()}>
          ADD
        </Button>
      </form>

      {hasTasks && (
        <Button variant="outline" size="sm" onClick={onToggleAll} className="self-start">
          {allDone ? 'Mark all as undone' : 'Mark all as done'}
        </Button>
      )}
    </div>
  );
};