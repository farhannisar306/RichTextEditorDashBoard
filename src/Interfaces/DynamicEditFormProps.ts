export interface DynamicEditFormProps {
    type: string;
    data: any;
    columns: any[];
    onSave: (updatedData: any) => void;
    onCancel: () => void;
}