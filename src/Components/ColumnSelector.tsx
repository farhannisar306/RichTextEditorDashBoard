import { Check, Settings2 } from 'lucide-react';
import { useState } from 'react';

interface ColumnSelectorProps {
    columns: Column[];
    visibleColumns: string[];
    onColumnToggle: (columnKey: string) => void;
}

const ColumnSelector = ({ columns, visibleColumns, onColumnToggle }: ColumnSelectorProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center gap-2 border-gray-300 bg-white hover:bg-gray-50 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:ring-offset-2 font-medium text-gray-700 text-sm focus:outline-none"
            >
                <Settings2 size={16} />
                Columns
            </button>

            {isOpen && (
                <div className="right-0 z-10 absolute bg-white ring-opacity-5 shadow-lg mt-2 rounded-lg ring-1 ring-black w-56 origin-top-right focus:outline-none">
                    <div className="py-1">
                        {columns.map((column) => (
                            <button
                                key={column.key}
                                onClick={() => onColumnToggle(column.key)}
                                className="flex justify-between items-center hover:bg-gray-100 px-4 py-2 w-full text-gray-700 text-sm"
                            >
                                <span>{column.label || column.key}</span>
                                {visibleColumns.includes(column.key) && (
                                    <Check size={16} className="text-green-600" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ColumnSelector; 