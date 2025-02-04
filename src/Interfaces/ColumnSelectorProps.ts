import { Column } from "./ColumnProps";

export interface ColumnSelectorProps {
    columns: Column[];
    visibleColumns: string[];
    onColumnToggle: (columnKey: string) => void;
}