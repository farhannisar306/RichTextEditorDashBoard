import { format } from 'date-fns';
import { Check, X } from 'lucide-react';
import { defaultCellRenderer } from '../utils/cellRenderers';

export const columns = [
    {
        key: 'thumbnail',
        label: 'Thumbnail',
        isEditable: true,
        sortable: true,
        render: (value: any, row: any, column: any) => defaultCellRenderer({ value, key: 'thumbnail', row, column })
    },
    {
        key: 'User',
        label: 'Author',
        isEditable: false,
        sortable: true,
        render: (value: any, row: any, column: any) => value?.name || 'Unknown'
    },
    {
        key: 'title',
        label: 'Title',
        isEditable: true,
        sortable: true,
        render: (value: any, row: any, column: any) => defaultCellRenderer({ value, key: 'title', row, column })
    },
    {
        key: 'content',
        label: 'Content',
        isEditable: true,
        sortable: true,
        render: (value: any, row: any, column: any) => value?.replace(/<[^>]*>/g, '').slice(0, 30) + '...' || 'No content'
    },
    {
        key: 'views',
        label: 'Views',
        isEditable: false,
        sortable: true,
        render: (value: any, row: any, column: any) => defaultCellRenderer({ value, key: 'views', row, column })
    },
    {
        key: 'is_published',
        label: 'Published',
        isEditable: true,
        sortable: true,
        render: (value: any, row: any, column: any) => defaultCellRenderer({ value, key: 'is_published', row, column })
    },
    {
        key: 'created_at',
        label: 'Created At',
        isEditable: false,
        sortable: true,
        render: (value: any, row: any, column: any) => defaultCellRenderer({ value, key: 'created_at', row, column })
    },
    {
        key: 'updated_at',
        label: 'Updated At',
        isEditable: false,
        sortable: true,
        render: (value: any, row: any, column: any) => defaultCellRenderer({ value, key: 'updated_at', row, column })
    },
    {
        key: 'short_preview',
        label: 'Preview',
        isEditable: true,
        sortable: false,
        render: (value: any, row: any, column: any) => defaultCellRenderer({ value, key: 'short_preview', row, column })
    },
    {
        key: 'estimate_reading_time',
        label: 'Reading Time',
        isEditable: false,
        sortable: true,
        render: (value: any, row: any, column: any) => `${value} min`
    },
    {
        key: 'likes',
        label: 'Likes',
        isEditable: false,
        sortable: true,
        render: (value: any[], row: any, column: any) => value?.length.toString() || '0'
    },
    {
        key: 'comments',
        label: 'Comments',
        isEditable: false,
        sortable: true,
        render: (value: any[], row: any, column: any) => value?.length.toString() || '0'
    }
]; 