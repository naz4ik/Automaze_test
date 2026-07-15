'use client';

interface Props {
  message: string;
  onClose: () => void;
}

export const ErrorNotification: React.FC<Props> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-4 right-4 flex items-center gap-3 rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-md">
      {message}
      <button onClick={onClose} className="font-bold text-red-500 hover:text-red-700">
        ×
      </button>
    </div>
  );
};