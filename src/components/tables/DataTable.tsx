import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../shadcn/table'
import { DataTableProps } from '@/util/interfaces'
import { Loader2 } from 'lucide-react'

export default function DataTable<TData, TValue>({
    columns,
    data,
    loading = false,
    tableName,
}: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data: Array.isArray(data) ? data : [],
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className="px-10">
            <Table className="font-poppins">
                <TableHeader>
                    {table.getHeaderGroups().map(headerGroup => (
                        <TableRow key={headerGroup.id} className="border-none bg-white">
                            {headerGroup.headers.map(header => (
                                <TableHead
                                    key={header.id}
                                    className={`text-primary-500 text-lg font-bold ${header.column.id === 'actions' ? 'text-center' : ''}`}
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.header,
                                              header.getContext(),
                                          )}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody className="bg-background-accent">
                    {loading ? (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                                    <Loader2 className="animate-spin h-5 w-5" />
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map(row => (
                            <TableRow
                                key={row.id}
                                className="border-y-5 border-background-accent bg-white text-base"
                                data-state={row.getIsSelected() && 'selected'}
                            >
                                {row.getVisibleCells().map(cell => (
                                    <TableCell
                                        key={cell.id}
                                        className={`truncate max-w-[100px] ${cell.column.id === 'actions' ? 'justify-end' : ''}`}
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No {tableName} found in this workspace
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
