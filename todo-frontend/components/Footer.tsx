import { Task } from '@/types/Task';

interface Props {
  tasks: Task[];
  onClearCompleted: () => void;
}

export const Footer: React.FC<Props> = ({ tasks, onClearCompleted }) => {
  const activeCount = tasks.filter(t => !t.isDone).length;
  const doneCount = tasks.length - activeCount;

  return (
    <div className="flex items-center justify-between py-3 text-sm text-muted-foreground">
      <span>Rest: {activeCount} from {tasks.length}</span>
      {doneCount > 0 && (
        <button onClick={onClearCompleted} className="text-red-500 hover:underline">
          Delete completed ({doneCount})
        </button>
      )}
    </div>
  );
};