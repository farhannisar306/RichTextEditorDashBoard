export interface Column {
    key: string;
    label?: string;
    render?: (value: any, row: any, column: Column) => React.ReactNode;
    sortable?: boolean;
    filterable?: boolean;
    visible?: boolean;
    isEditable?: boolean;
}