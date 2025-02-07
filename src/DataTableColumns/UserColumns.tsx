import { defaultCellRenderer } from '../utils/cellRenderers';

export const columns = [
    {
        key: 'avatar',
        label: 'Avatar',
        isEditable: false,
        render: (value: any, row: any, column: any) => defaultCellRenderer({ value, key: 'avatar', row, column })
    },
    {
        key: 'name',
        label: 'Name',
        sortable: true,
        filterable: true,
        isEditable: true,
        render: (value: any, row: any, column: any) => defaultCellRenderer({ value, key: 'name', row, column })
    },
    {
        key: 'email',
        label: 'Email',
        sortable: true,
        filterable: true,
        isEditable: false,
        render: (value: any, row: any, column: any) => defaultCellRenderer({ value, key: 'email', row, column })
    },
    {
        key: 'domain',
        label: 'Domain',
        sortable: true,
        filterable: true,
        isEditable: true,
        render: (value: any, row: any, column: any) => defaultCellRenderer({ value, key: 'domain', row, column })
    },
    {
        key: 'short_bio',
        label: 'Short Bio',
        filterable: true,
        sortable: true,
        isEditable: true,
        render: (value: any, row: any, column: any) => defaultCellRenderer({ value, key: 'short_bio', row, column })
    },
    {
        key: 'isActive',
        label: 'Account Status',
        sortable: true,
        isEditable: true,
        render: (value: any, row: any, column: any) => defaultCellRenderer({ value, key: 'isActive', row, column })
    },
    {
        key: 'isBlacklisted',
        label: 'Blacklisted',
        sortable: true,
        isEditable: true,
        render: (value: any, row: any, column: any) => defaultCellRenderer({ value, key: 'isBlacklisted', row, column })
    },
    {
        key: 'isPremium',
        label: 'Subscription',
        sortable: true,
        isEditable: true,
        render: (value: any, row: any, column: any) => defaultCellRenderer({ value, key: 'isPremium', row, column })
    },
    {
        key: 'created_at',
        label: 'Created At',
        sortable: true,
        isEditable: false,
        render: (value: any, row: any, column: any) => defaultCellRenderer({ value, key: 'created_at', row, column })
    },
];