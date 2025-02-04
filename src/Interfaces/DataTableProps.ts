import { Column } from "./ColumnProps";

export interface DataTableProps<T> {
    data: T[];
    columns: Column[];
    onEdit?: (row: T) => void;
    onDelete?: (selectedRows: T[]) => void;
    pageSize?: number;
    pageSizeOptions?: number[];
    className?: string;
    actions?: boolean;
}