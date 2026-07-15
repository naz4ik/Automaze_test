export interface Task {
  id: number;
  title: string;
  priority: number; // 1–10
  isDone: boolean;
  createdAt: string;
  dueDate: string | null;
}