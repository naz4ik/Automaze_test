import { Task } from '@/types/Task';
import { TaskItem } from './TaskItem';

interface Props {
  tasks: Task[];
  processingIds: number[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, data: { title?: string; priority?: number }) => Promise<void>;
}

export const TaskList: React.FC<Props> = ({ tasks, processingIds, onToggle, onDelete, onEdit }) => {
  if (tasks.length === 0) {
    return <div className="py-12 text-center text-muted-foreground">Задач не знайдено</div>;
  }

  return (
    <div className="rounded-md border overflow-hidden">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          isProcessing={processingIds.includes(task.id)}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};