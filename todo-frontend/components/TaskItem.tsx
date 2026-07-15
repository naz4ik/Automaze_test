"use client";

import { useState } from "react";
import { Task } from "@/types/Task";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PrioritySelect } from "./PrioritySelect";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface Props {
  task: Task;
  isProcessing: boolean;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (
    id: number,
    data: { title?: string; priority?: number },
  ) => Promise<void>;
}

export const TaskItem: React.FC<Props> = ({
  task,
  isProcessing,
  onToggle,
  onDelete,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const isOverdue =
    !!task.dueDate && !task.isDone && new Date(task.dueDate) < new Date();

  const handleSave = async () => {
    if (!title.trim()) {
      onDelete(task.id);
      return;
    }
    if (title !== task.title) {
      await onEdit(task.id, { title: title.trim() });
    }
    setIsEditing(false);
  };

  return (
    <div
      className={cn(
        "flex items-center gap-3 border-b px-4 py-3 bg-white last:border-b-0",
        isProcessing && "opacity-50 pointer-events-none",
      )}
    >
      <Checkbox
        checked={task.isDone}
        onCheckedChange={() => onToggle(task.id)}
      />

      {isEditing ? (
        <Input
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSave();
            if (e.key === "Escape") {
              setTitle(task.title);
              setIsEditing(false);
            }
          }}
          className="flex-1"
        />
      ) : (
        <span
          onDoubleClick={() => setIsEditing(true)}
          className={cn(
            "flex-1 cursor-text",
            task.isDone && "line-through text-muted-foreground",
          )}
        >
          {task.title}
        </span>
      )}

      <PrioritySelect
        value={task.priority}
        onChange={(p) => onEdit(task.id, { priority: p })}
        disabled={isProcessing}
      />
      <Badge variant="secondary">P{task.priority}</Badge>
      {task.dueDate && (
        <span
          className={cn(
            "text-xs min-w-[90px]",
            isOverdue ? "text-red-600 font-semibold" : "text-muted-foreground",
          )}
        >
          Due: {new Date(task.dueDate).toLocaleDateString()}
          {isOverdue && " (overdue)"}
        </span>
      )}

      <Button variant="ghost" size="icon" onClick={() => onDelete(task.id)}>
        <X className="size-4" />
      </Button>
    </div>
  );
};
