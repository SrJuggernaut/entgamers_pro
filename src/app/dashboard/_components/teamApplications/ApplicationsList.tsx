import IconButton from '@/components/ui/IconButton'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableHeadCell, TableRow } from '@/components/ui/Table'
import useManageError from '@/hooks/useManageError'
import { css } from '@/styled-system/css'
import { formatDate } from '@/utilities/date'
import type { TeamApplication, TeamApplicationList } from '@/utilities/teamApplication'
import { faChevronLeft, faChevronRight, faSort, faSortAsc, faSortDesc } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable, type ColumnFiltersState, type PaginationState, type RowData, type SortingState } from '@tanstack/react-table'
import { getAllTeamApplications, updateTeamApplication } from 'entgamers-database/frontend/database/teamApplications'
import { Query } from 'entgamers-database/lib/appwrite'
import { useEffect, useState, type FC } from 'react'
import ApplicationsFilter from './ApplicationsFilter'
import StatusUpdater from './StatusUpdater'

declare module '@tanstack/table-core' {
  interface TableMeta<TData extends RowData> {
    updateRow: (id: string, value: Partial<TData>) => Promise<void>
  }
}

const columnHelper = createColumnHelper<TeamApplication>()

const columns = [
  columnHelper.accessor('$id', {
    header: 'ID',
    enableColumnFilter: false
  }),
  columnHelper.accessor('status', {
    header: 'Estado',
    cell: StatusUpdater,
    getUniqueValues() {
      return ['Pending', 'Accepted', 'Rejected']
    }
  }),
  columnHelper.accessor('role', {
    header: 'Rol'
  }),
  columnHelper.accessor('name', {
    header: 'Nombre'
  }),
  columnHelper.accessor('message', {
    header: 'Mensaje',
    minSize: 450
  }),
  columnHelper.accessor('email', {
    header: 'Correo'
  }),
  columnHelper.accessor('discord', {
    header: 'Discord'
  }),
  columnHelper.accessor('$createdAt', {
    header: 'Creado',
    enableColumnFilter: false,
    cell: (info) => {
      return formatDate(new Date(info.getValue()))
    }
  }),
  columnHelper.accessor('$updatedAt', {
    header: 'Actualizado',
    enableColumnFilter: false,
    cell: (info) => {
      return formatDate(new Date(info.getValue()))
    }
  })
]

const ApplicationsList: FC = () => {
  const { manageError } = useManageError()
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 })
  const [sorting, setSorting] = useState<SortingState>([{ id: '$createdAt', desc: true }])
  const [applications, setApplications] = useState<TeamApplicationList>({ total: 0, documents: [] })
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([{ id: 'status', value: 'Pending' }])

  const table = useReactTable({
    data: applications.documents,
    columns,
    initialState: {
      columnVisibility: {
        $id: false,
        email: false
      }
    },
    state: {
      pagination,
      sorting,
      columnFilters
    },
    meta: {
      updateRow: async (id: string, value: Partial<TeamApplication>) => {
        const updatedTeamApplication = await updateTeamApplication(id, value)
        const newApplications = applications.documents.map((application) => application.$id === updatedTeamApplication.$id ? updatedTeamApplication : application)
        setApplications({ total: applications.total, documents: newApplications })
      }
    },
    manualPagination: true,
    rowCount: applications.total,
    onPaginationChange: setPagination,
    enableSorting: true,
    manualSorting: true,
    onSortingChange: setSorting,
    manualFiltering: true,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel()
  })

  useEffect(() => {
    const query: string[] = [
      Query.limit(pagination.pageSize),
      Query.offset(pagination.pageIndex * pagination.pageSize)
    ]
    if (sorting.length > 0) {
      const sort: string = sorting[0].desc ? Query.orderDesc(sorting[0].id) : Query.orderAsc(sorting[0].id)
      query.push(sort)
    }
    if (columnFilters.length > 0) {
      const filter: string[] = columnFilters.map((columnFilter) => {
        return Query.contains(columnFilter.id, columnFilter.value as string)
      })
      query.push(...filter)
    }
    getAllTeamApplications(query)
      .then((applicationList) => { setApplications(applicationList) })
      .catch((error) => {
        if (error instanceof Error && error.name === 'AbortError') return
        manageError(error, 'Error al obtener las aplicaciones', 'Error desconocido al obtener las aplicaciones', 'error')
      })
  }, [pagination, sorting, columnFilters, manageError])

  // TODO: Better UI Controls for: column visibility. Quantity selector.
  return (
    <>
      <div
        className={css({
          display: 'flex',
          gap: 'small',
          marginBottom: 'small'
        })}
      >
        {table.getAllLeafColumns().map((column) => (
          <div key={column.id}>
            <label htmlFor={`${column.id}-view`}>
              <input
                type="checkbox"
                id={`${column.id}-view`}
                checked={column.getIsVisible()}
                onChange={column.getToggleVisibilityHandler()}
              />
              {' '}
              {column.columnDef.header?.toString() ?? column.id}
            </label>
          </div>
        ))}
      </div>
      <TableContainer>
        <Table>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHeadCell
                    key={header.id}
                    className={css({
                      'verticalAlign': 'top',
                      'position': 'relative',
                      '&:hover > [data-is-resizing]': {
                        backgroundColor: 'border'
                      }
                    })}
                    style={{ minWidth: header.getSize() }}
                  >
                    <div
                      className={css({
                        display: 'flex',
                        flexDirection: 'column'
                      })}
                    >
                      <div
                        className={css({
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: 'small'
                        })}
                      >
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext()) }
                        {header.column.getCanSort() && (
                          <IconButton
                            size="small"
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            <FontAwesomeIcon icon={header.column.getIsSorted() === 'asc' ? faSortAsc : header.column.getIsSorted() === 'desc' ? faSortDesc : faSort} size="sm" />
                          </IconButton>
                        )}
                      </div>
                      {header.column.getCanFilter()
                        ? (
                          <ApplicationsFilter column={header.column} />
                        )
                        : null}
                    </div>
                    <button
                      type="button"
                      className={css({
                        'position': 'absolute',
                        'top': 0,
                        'right': 0,
                        'height': '100%',
                        'width': '5px',
                        'cursor': 'col-resize',
                        'userSelect': 'none',
                        'touchAction': 'none',
                        '&:hover': {
                          backgroundColor: 'border'
                        },
                        '&[data-is-resizing=true]': {
                          backgroundColor: 'primary'
                        }
                      })}
                      style={{
                        transform: `translateX(${1 * (table.getState().columnSizingInfo
                          .deltaOffset ?? 0)}px)`
                      }}
                      data-is-resizing={header.column.getIsResizing()}
                      onDoubleClick={header.getResizeHandler()}
                      onTouchStart={header.getResizeHandler()}
                      onMouseDown={header.getResizeHandler()}
                    />
                  </TableHeadCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div
        className={css({
          display: 'flex',
          gap: 'small',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBlock: 'medium'
        })}
      >
        <IconButton
          onClick={() => { table.previousPage() }}
          disabled={!table.getCanPreviousPage()}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </IconButton>
        Pagina
        {' '}
        {table.getState().pagination.pageIndex + 1}
        {' '}
        de
        {' '}
        {table.getPageCount()}
        <IconButton
          onClick={() => { table.nextPage() }}
          disabled={!table.getCanNextPage()}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </IconButton>
      </div>
    </>
  )
}

export default ApplicationsList
