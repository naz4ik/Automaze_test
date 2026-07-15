'use client';

import { useTasks } from '@/hooks/useTasks';
import { Header } from './Header';
import { SearchBar } from './SearchBar';
import { FilterBar } from './FilterBar';
import { TaskList } from './TaskList';
import { Footer } from './Footer';
import { ErrorNotification } from './ErrorNotification';

export const TodoApp = () => {
  const {
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
  } = useTasks();

  const allDone = tasks.length > 0 && tasks.every(t => t.isDone);

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="py-6 text-center text-3xl font-bold">todos</h1>

      <div className="rounded-lg border bg-white shadow-sm">
        <Header onAdd={addTask} onToggleAll={toggleAll} isSubmitting={isLoading} hasTasks={tasks.length > 0} allDone={allDone} />

        <div className="flex flex-wrap items-center gap-3 px-4 pt-3">
          <SearchBar value={searchInput} onChange={setSearchInput} />
        </div>

        <div className="px-4">
          <FilterBar filter={filter} onFilterChange={setFilter} sortOrder={sortOrder} onSortOrderChange={setSortOrder} />
        </div>

        <div className="px-4 pb-4">
          <TaskList tasks={tasks} processingIds={processingIds} onToggle={toggleTask} onDelete={removeTask} onEdit={editTask} />
        </div>

        {tasks.length > 0 && (
          <div className="px-4 pb-4">
            <Footer tasks={tasks} onClearCompleted={clearCompleted} />
          </div>
        )}
      </div>

      <ErrorNotification message={errorMessage} onClose={() => setErrorMessage('')} />
    </div>
  );
};