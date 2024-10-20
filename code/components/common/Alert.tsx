import { CheckCircleIcon, XCircleIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

export default function Alert({ message, type }: { message: string, type: 'success' | 'error' }) {
  const [isOpen, setIsOpen] = useState(true);
  
  return (
    <div className={`p-4 flex items-center mt-2 gap-2 justify-between text-sm ${type === 'success' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'} rounded-lg ${isOpen ? 'block' : 'hidden'}`}>
      <div className="flex items-center gap-2">
        {type === 'success' ? <CheckCircleIcon className="w-4 h-4" /> : <XCircleIcon className="w-4 h-4" />}
        <span>{message}</span>
      </div>
      <button className="p-1" onClick={() => setIsOpen(false)}>
        <XMarkIcon className="w-4 h-4" />
      </button>
    </div>
  );
}