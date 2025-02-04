import React from 'react';
import { splitStringByCaseAutomatically } from '../Services/StringManipulator_Splitters';
import { useUpdateUser } from '../hooks/UpdateUser';
import { useUpdateArticle } from '../hooks/UpdateArticle';
import { DynamicEditFormProps } from '../Interfaces/DynamicEditFormProps';

const DynamicEditForm: React.FC<DynamicEditFormProps> = ({ data, columns, onCancel, type, onSave }) => {
    const [formData, setFormData] = React.useState(data);
    const updateUserMutation = useUpdateUser();
    const updateArticleMutation = useUpdateArticle();

    const handleChange = (key: string, value: any) => {
        setFormData((prev: Record<string, any>) => ({
            ...prev,
            [key]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (type === 'userInfoEdit') {
            updateUserMutation.mutate(
                { user_id: formData.id, body: formData },
                {
                    onSuccess: () => {
                        alert("User Info Updated Successfully");
                        onSave(formData);
                    },
                    onError: (error) => console.log(error)
                }
            );
        } else if (type === 'articlesInfoEdit') {
            updateArticleMutation.mutate(
                { article_id: formData.id, body: formData },
                {
                    onSuccess: () => {
                        alert("Article Updated Successfully");
                        onSave(formData);
                    },
                    onError: (error) => console.log(error)
                }
            );
        }
    };

    const renderField = (column: any) => {
        const value = formData[column.key] ?? '';

        const label = column.label || splitStringByCaseAutomatically(column.key);
        const isEditable = column.isEditable ? true : false;

        // Common input props
        const commonInputProps = {
            disabled: !isEditable,
            className: `${!isEditable ? 'bg-gray-200 cursor-not-allowed' : 'bg-white'} border-gray-300 focus:border-green-500 shadow-sm rounded-md focus:ring-green-500`
        };

        if (typeof value === 'boolean') {
            return (
                <div key={column.key} className="mb-4">
                    <label className={`flex items-center space-x-2 ${!isEditable ? 'cursor-not-allowed' : ''}`}>
                        <input
                            type="checkbox"
                            checked={value}
                            onChange={(e) => handleChange(column.key, e.target.checked)}
                            {...commonInputProps}
                        />
                        <span className="font-medium text-gray-700 text-sm">{label}</span>
                    </label>
                </div>
            );
        }

        if (column.key.toLowerCase().includes('avatar') || column.key.toLowerCase().includes('image') || column.key.toLowerCase().includes('picture')) {
            return (
                <div key={column.key} className="mb-4">
                    <label className="block mb-1 font-medium text-gray-700 text-sm">{label}</label>
                    <div className="flex items-center space-x-4">
                        <img src={value || ''} alt={label} className="rounded-full w-12 h-12 object-cover" />
                        <input
                            type="text"
                            value={value || ''}
                            onChange={(e) => handleChange(column.key, e.target.value)}
                            className={`flex-1 ${commonInputProps.className}`}
                            disabled={!isEditable}
                        />
                    </div>
                </div>
            );
        }

        if (value instanceof Date || (typeof value === 'string' && !isNaN(Date.parse(value)))) {
            return (
                <div key={column.key} className="mb-4">
                    <label className="block mb-1 font-medium text-gray-700 text-sm">{label}</label>
                    <input
                        type="datetime-local"
                        value={new Date(value).toISOString().slice(0, 16)}
                        onChange={(e) => handleChange(column.key, new Date(e.target.value))}
                        className={`w-full ${commonInputProps.className}`}
                        disabled={!isEditable}
                    />
                </div>
            );
        }

        // For text fields, check if it's a long text to use textarea
        const isLongText = value && typeof value === 'string' && value.length > 100;
        
        return (
            <div key={column.key} className="mb-4">
                <label className="block mb-1 font-medium text-gray-700 text-sm">{label}</label>
                {isLongText ? (
                    <textarea
                        value={value}
                        onChange={(e) => handleChange(column.key, e.target.value)}
                        className={`w-full min-h-[100px] ${commonInputProps.className}`}
                        disabled={!isEditable}
                    />
                ) : (
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => handleChange(column.key, e.target.value)}
                        className={`w-full transition-all duration-200 ${commonInputProps.className}`}
                        disabled={!isEditable}
                    />
                )}
            </div>
        );
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {columns
                .filter(column => column.key !== 'id' && !column.key.toLowerCase().includes('manage'))
                .map(renderField)}
            
            <div className="flex justify-end space-x-3 pt-4 border-t">
                <button
                    type="button"
                    onClick={onCancel}
                    className="border-gray-300 hover:bg-gray-50 px-4 py-2 border rounded-md font-medium text-gray-700 text-sm"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 shadow-sm px-4 py-2 border border-transparent rounded-md font-medium text-sm text-white"
                >
                    Save Changes
                </button>
            </div>
        </form>
    );
};

export default DynamicEditForm; 