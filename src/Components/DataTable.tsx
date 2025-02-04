import { motion } from "framer-motion";
import {ChevronUp, ChevronDown, ChevronLeft, ChevronRight, X, Edit2, Trash2 } from 'lucide-react';
import { useMemo, useState } from "react";
import Searchbar from "./Searchbar";
import ColumnSelector from './ColumnSelector';
import { Column } from "../Interfaces/ColumnProps";
import { DataTableProps } from "../Interfaces/DataTableProps";
import { defaultPagesize } from "../static/data";
import { pageSideOptions } from "../static/data";


const defaultRenderCell = (value: any, row: any, column: Column) => {
    return column.render ? column.render(value, row, column) : value?.toString() || '';
};

export function DataTable<T extends { id: string | number }>({
    data,
    columns,
    onEdit,
    onDelete,
    pageSize: initialPageSize = defaultPagesize,
    pageSizeOptions = pageSideOptions,
    className = "",
    actions,
}: DataTableProps<T>) {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(initialPageSize);
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
    const [filters, setFilters] = useState<{ [key: string]: string }>({});
    const [globalSearchTerm, setGlobalSearchTerm] = useState("");
    const [selectedRows, setSelectedRows] = useState<T[]>([]);
    const [visibleColumns, setVisibleColumns] = useState(
        columns.map(col => col.key)
    );

    // Column visibility toggle handler
    const handleColumnToggle = (columnKey: string) => {
        setVisibleColumns(current =>
            current.includes(columnKey)
                ? current.filter(key => key !== columnKey)
                : [...current, columnKey]
        );
    };

    // Row selection handlers
    const handleRowSelect = (row: T, checked: boolean) => {
        setSelectedRows(current =>
            checked
                ? [...current, row]
                : current.filter(r => r.id !== row.id)
        );
    };

    const handleSelectAll = (checked: boolean) => {
        setSelectedRows(checked ? data : []);
    };

    // Apply filters, sorting, and pagination
    const processedData = useMemo(() => {
        let processed = [...data];

        // Global search
        if (globalSearchTerm) {
            const searchTerm = globalSearchTerm.toLowerCase();
            processed = processed.filter(item =>
                Object.entries(item).some(([key, value]) =>
                    columns.find(col => col.key === key)?.filterable !== false &&
                    String(value).toLowerCase().includes(searchTerm)
                )
            );
        }

        // Column filters
        Object.entries(filters).forEach(([key, value]) => {
            if (value) {
                processed = processed.filter(item =>
                    String(item[key as keyof T]).toLowerCase().includes(value.toLowerCase())
                );
            }
        });

        // Sorting
        if (sortConfig) {
            processed.sort((a, b) => {
                const aValue = a[sortConfig.key as keyof T];
                const bValue = b[sortConfig.key as keyof T];

                if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
                if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }

        return processed;
    }, [data, sortConfig, filters, globalSearchTerm]);

    // Pagination
    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return processedData.slice(start, start + pageSize);
    }, [processedData, currentPage, pageSize]);

    const totalPages = Math.ceil(processedData.length / pageSize);

    return (
        <div className="flex flex-col space-y-4 w-full h-full">
            <div className="flex flex-wrap justify-between items-center gap-4 bg-white shadow-sm p-4 rounded-lg">
                <div className="flex items-center gap-4">
                    <Searchbar
                        globalSearchTerm={globalSearchTerm}
                        setGlobalSearchTerm={setGlobalSearchTerm}
                    />
                    <ColumnSelector
                        columns={columns}
                        visibleColumns={visibleColumns}
                        onColumnToggle={handleColumnToggle}
                    />
                </div>

                <div className="flex items-center gap-4">
                    {selectedRows.length > 0 && (
                        <button
                            onClick={() => onDelete?.(selectedRows)}
                            className="inline-flex items-center gap-2 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg text-red-700 transition-colors duration-200"
                        >
                            <Trash2 size={16} />
                            Delete ({selectedRows.length})
                        </button>
                    )}
                    <div className="flex items-center gap-2">
                        <select
                            value={pageSize}
                            onChange={(e) => {
                                setPageSize(Number(e.target.value));
                                setCurrentPage(1);
                            }}
                            className="border-gray-300 rounded-lg text-sm"
                        >
                            {pageSizeOptions.map(size => (
                                <option key={size} value={size}>{size} per page</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="relative bg-white shadow rounded-lg overflow-hidden">
                <div className="scrollbar-thumb-gray-300 overflow-x-auto scrollbar-thin scrollbar-track-gray-100">
                    <style>
                        {`
                        /* Custom scrollbar styles */
                        .scrollbar-thin::-webkit-scrollbar {
                            height: 6px;
                            width: 6px;
                        }
                        .scrollbar-thin::-webkit-scrollbar-track {
                            background: #f3f4f6;
                            border-radius: 3px;
                        }
                        .scrollbar-thin::-webkit-scrollbar-thumb {
                            background: #d1d5db;
                            border-radius: 3px;
                        }
                        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
                            background: #9ca3af;
                        }
                        `}
                    </style>
                    <table className={`w-full ${className}`}>
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-2 py-3 w-8">
                                    <input
                                        type="checkbox"
                                        checked={selectedRows.length === data.length}
                                        onChange={(e) => handleSelectAll(e.target.checked)}
                                        className="border-gray-300 rounded focus:ring-green-500 w-4 h-4 text-green-600"
                                    />
                                </th>
                                {columns.map((column) =>
                                    visibleColumns.includes(column.key) && (
                                        <th
                                            key={column.key}
                                            onClick={() => column.sortable && setSortConfig({
                                                key: column.key,
                                                direction: sortConfig?.key === column.key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
                                            })}
                                            className={`${typeof data[0]?.[column.key as keyof T] === 'boolean' ? 'w-24 px-2' : 'px-6'
                                                } py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider ${column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''
                                                }`}
                                        >
                                            <div className="flex justify-center items-center gap-2">
                                                <span>{column.label || column.key}</span>
                                                {column.sortable && (
                                                    <span className="inline-flex flex-col">
                                                        <ChevronUp
                                                            size={12}
                                                            className={sortConfig?.key === column.key && sortConfig.direction === 'asc' ? 'text-green-600' : 'text-gray-400'}
                                                        />
                                                        <ChevronDown
                                                            size={12}
                                                            className={sortConfig?.key === column.key && sortConfig.direction === 'desc' ? 'text-green-600' : 'text-gray-400'}
                                                        />
                                                    </span>
                                                )}
                                            </div>
                                        </th>
                                    )
                                )}
                                {
                                    actions && (
                                        <th className="text-right px-2 py-3 w-16 font-medium text-gray-500 text-xs uppercase tracking-wider">
                                            Actions
                                        </th>
                                    )
                                }
                            </tr>
                        </thead>

                        <tbody className="bg-white divide-y divide-gray-200">
                            {paginatedData.map((row, idx) => (
                                <motion.tr
                                    key={row.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                                    className="hover:bg-gray-50"
                                >
                                    <td className="px-2 py-4 whitespace-nowrap">
                                        <input
                                            type="checkbox"
                                            checked={selectedRows.some(r => r.id === row.id)}
                                            onChange={(e) => handleRowSelect(row, e.target.checked)}
                                            className="border-gray-300 rounded focus:ring-green-500 w-4 h-4 text-green-600"
                                        />
                                    </td>
                                    {columns.map(column =>
                                        visibleColumns.includes(column.key) && (
                                            <td key={column.key} className={`whitespace-nowrap ${typeof row[column.key as keyof T] === 'boolean' ? 'w-24 px-2' : 'px-6'
                                                } py-4`}>
                                                {column.render
                                                    ? column.render(row[column.key as keyof T], row, column)
                                                    : defaultRenderCell(row[column.key as keyof T], row, column)}
                                            </td>
                                        )
                                    )}
                                    {
                                        actions && (
                                            <td className="text-right px-6 py-4 font-medium text-sm whitespace-nowrap">
                                                <button
                                                    onClick={() => onEdit?.(row)}
                                                    className="text-green-600 hover:text-green-900 transition-colors duration-200"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                            </td>
                                        )
                                    }
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {totalPages > 1 && (
                    <div className="flex justify-between items-center border-gray-200 bg-white px-6 py-3 border-t">
                        <div className="flex flex-1 justify-between sm:hidden">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="inline-flex relative items-center border-gray-300 bg-white hover:bg-gray-50 px-4 py-2 border rounded-md font-medium text-gray-700 text-sm"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="inline-flex relative items-center border-gray-300 bg-white hover:bg-gray-50 ml-3 px-4 py-2 border rounded-md font-medium text-gray-700 text-sm"
                            >
                                Next
                            </button>
                        </div>
                        <div className="sm:flex sm:flex-1 sm:justify-between sm:items-center hidden">
                            <div>
                                <p className="text-gray-700 text-sm">
                                    Showing <span className="font-medium">{((currentPage - 1) * pageSize) + 1}</span> to{' '}
                                    <span className="font-medium">{Math.min(currentPage * pageSize, processedData.length)}</span> of{' '}
                                    <span className="font-medium">{processedData.length}</span> results
                                </p>
                            </div>
                            <div>
                                <nav className="inline-flex relative z-0 -space-x-px shadow-sm rounded-md" aria-label="Pagination">
                                    <button
                                        onClick={() => setCurrentPage(1)}
                                        disabled={currentPage === 1}
                                        className="inline-flex relative items-center border-gray-300 bg-white hover:bg-gray-50 px-2 py-2 border rounded-l-md font-medium text-gray-500 text-sm"
                                    >
                                        <span className="sr-only">First</span>
                                        <ChevronLeft className="w-5 h-5" aria-hidden="true" />
                                    </button>
                                    <button
                                        onClick={() => setCurrentPage(totalPages)}
                                        disabled={currentPage === totalPages}
                                        className="inline-flex relative items-center border-gray-300 bg-white hover:bg-gray-50 px-2 py-2 border rounded-r-md font-medium text-gray-500 text-sm"
                                    >
                                        <span className="sr-only">Last</span>
                                        <ChevronRight className="w-5 h-5" aria-hidden="true" />
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
