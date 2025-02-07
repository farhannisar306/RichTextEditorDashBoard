import { format } from 'date-fns';
import { Check, X } from 'lucide-react';

export const defaultCellRenderer = ({ value, key}: { value: any, key: string, row?: any, column?: any }) => {
    if (typeof value === 'boolean') {
        const booleanStyle = {
            true: 'bg-green-100 text-green-800',
            false: 'bg-gray-100 text-gray-800',
            true_icon: <Check size={10} className="mr-0.5" />,
            false_icon: <X size={10} className="mr-0.5" />
        };

        return (
            <div className="flex justify-center">
                <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium ${value ? booleanStyle.true : booleanStyle.false}`}>
                    {value ? booleanStyle.true_icon : booleanStyle.false_icon}
                    {value ? 'Yes' : 'No'}
                </span>
            </div>
        );
    }

    if (typeof value === 'string' && (
        key.toLowerCase().includes('avatar') ||
        key.toLowerCase().includes('image') ||
        value.match(/\.(jpg|jpeg|png|gif|webp)$/i)
    )) {
        return (
            <div className="flex justify-center items-center">
                <img
                    src={value}
                    alt={`${key}`}
                    className="rounded-full ring-2 ring-white w-10 h-10 object-fit"
                    onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/40?text=404';
                    }}
                />
            </div>
        );
    }

    if (value instanceof Date || (typeof value === 'string' && !isNaN(Date.parse(value)))) {
        return format(new Date(value), "dd\'th\' MMM yyyy");
    }
    
    return <span className="text-gray-600 text-sm">{value}</span>;
}; 