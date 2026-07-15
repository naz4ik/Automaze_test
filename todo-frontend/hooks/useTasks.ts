"use client";

import { useCallback, useEffect, useState } from "react";
import { Task } from "@/types/Task";
import { Filter } from "@/types/Filter";
import {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
  toggleTaskDone,
  toggleAllTasks,
  deleteCompletedTasks,
} from "@/lib/api/tasks";

export type SortOrder = "asc" | "desc" | null;

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);
  const [processingIds, setProcessingIds] = useState<number[]>([]);

  // debounce пошуку, щоб не бити бек на кожну літеру
  useEffect(() => {
    const timer = setTimeout(() => setSearch(searchInput), 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

const loadTasks = useCallback(async () => {
  await Promise.resolve(); 
  setIsLoading(true);
  setErrorMessage('');

  try {
    const status = filter === Filter.All ? undefined : (filter as 'done' | 'undone');
    const data = await getTasks({
      search: search || undefined,
      status,
      sortOrder: sortOrder ?? undefined,
    });

    setTasks(data);
  } catch {
    setErrorMessage('Не вдалося завантажити задачі');
  } finally {
    setIsLoading(false);
  }
}, [search, filter, sortOrder]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  useEffect(() => {
    if (!errorMessage) return;
    const timer = setTimeout(() => setErrorMessage(""), 3000);
    return () => clearTimeout(timer);
  }, [errorMessage]);

  const addTask = async (title: string, priority: number, dueDate?: string) => {
    setErrorMessage("");
    try {
      const newTask = await createTask({ title, priority, dueDate });
      setTasks((prev) => [...prev, newTask]);
    } catch {
      setErrorMessage("Не вдалося додати задачу");
    }
  };

  const removeTask = async (taskId: number) => {
    setProcessingIds((prev) => [...prev, taskId]);
    try {
      await deleteTask(taskId);
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
    } catch {
      setErrorMessage("Не вдалося видалити задачу");
    } finally {
      setProcessingIds((prev) => prev.filter((id) => id !== taskId));
    }
  };

  const editTask = async (
    taskId: number,
    data: { title?: string; priority?: number },
  ) => {
    setProcessingIds((prev) => [...prev, taskId]);
    try {
      const updated = await updateTask(taskId, data);
      setTasks((prev) => prev.map((t) => (t.id === taskId ? updated : t)));
    } catch {
      setErrorMessage("Не вдалося оновити задачу");
    } finally {
      setProcessingIds((prev) => prev.filter((id) => id !== taskId));
    }
  };

  const toggleTask = async (taskId: number) => {
    setProcessingIds((prev) => [...prev, taskId]);
    try {
      const updated = await toggleTaskDone(taskId);
      setTasks((prev) => prev.map((t) => (t.id === taskId ? updated : t)));
    } catch {
      setErrorMessage("Не вдалося оновити статус задачі");
    } finally {
      setProcessingIds((prev) => prev.filter((id) => id !== taskId));
    }
  };

  const toggleAll = async () => {
    setIsLoading(true);
    try {
      await toggleAllTasks();
      await loadTasks();
    } catch {
      setErrorMessage("Не вдалося оновити задачі");
    } finally {
      setIsLoading(false);
    }
  };
  const clearCompleted = async () => {
    setIsLoading(true);
    try {
      await deleteCompletedTasks();
      setTasks((prev) => prev.filter((t) => !t.isDone));
    } catch {
      setErrorMessage("Не вдалося видалити виконані задачі");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    tasks,
    isLoading,
    errorMessage,
    setErrorMessage,
    searchInput,
    setSearchInput,
    filter,
    setFilter,
    sortOrder,
    setSortOrder,
    processingIds,
    addTask,
    removeTask,
    editTask,
    toggleTask,
    toggleAll,
    clearCompleted,
  };
};
