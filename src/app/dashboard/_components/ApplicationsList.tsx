import IconButton from '@/components/ui/IconButton'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableHeadCell, TableRow } from '@/components/ui/Table'
import DebouncedInput from '@/components/ui/form/DebouncedInput'
import useManageError from '@/hooks/useManageError'
import { css } from '@/styled-system/css'
import { formatDate } from '@/utilities/date'
import { type TeamApplication, type TeamApplicationList } from '@/utilities/teamApplication'
import { faChevronLeft, faChevronRight, faSort, faSortAsc, faSortDesc } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { rankItem } from '@tanstack/match-sorter-utils'
import { createColumnHelper, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, type Column, type FilterFn, type Table as TableType } from '@tanstack/react-table'
import { useCallback, useEffect, useMemo, useState, type FC, type ReactNode } from 'react'

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value as string)

  // Store the itemRank info
  addMeta({
    itemRank
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

function Filter ({
  column,
  table
}: {
  column: Column<any, unknown>
  table: TableType<any>
}): ReactNode {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id)

  const columnFilterValue = column.getFilterValue()

  const sortedUniqueValues = useMemo(() => typeof firstValue === 'number'
    ? []
    // eslint-disable-next-line @typescript-eslint/require-array-sort-compare
    : Array.from(column.getFacetedUniqueValues().keys()).sort()
  , [column.getFacetedUniqueValues()])

  return typeof firstValue === 'number'
    ? (
      <div>
        <div className="flex space-x-2">
          <DebouncedInput
            fullWidth
            type="number"
            min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
            max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
            value={(columnFilterValue as [number, number])?.[0] ?? ''}
            onChange={value => { column.setFilterValue((old: [number, number]) => [value, old?.[1]]) }
            }
            placeholder={`Min ${
              ((column.getFacetedMinMaxValues()?.[0]) != null)
                ? `(${column.getFacetedMinMaxValues()?.[0]})`
                : ''
            }`}
            className="w-24 border shadow rounded"
          />
          <DebouncedInput
            fullWidth
            type="number"
            min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
            max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
            value={(columnFilterValue as [number, number])?.[1] ?? ''}
            onChange={value => { column.setFilterValue((old: [number, number]) => [old?.[0], value]) }
            }
            placeholder={`Max ${
              ((column.getFacetedMinMaxValues()?.[1]) != null)
                ? `(${column.getFacetedMinMaxValues()?.[1]})`
                : ''
            }`}
            className="w-24 border shadow rounded"
          />
        </div>
        <div className="h-1" />
      </div>
    )
    : (
      <>
        <datalist id={column.id + 'list'}>
          {sortedUniqueValues.slice(0, 5000).map((value: any) => (
            <option value={value} key={value} />
          ))}
        </datalist>
        <DebouncedInput
          fullWidth
          type="text"
          value={(columnFilterValue ?? '') as string}
          onChange={value => { column.setFilterValue(value) }}
          placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
          className="w-36 border shadow rounded"
          list={column.id + 'list'}
        />
        <div className="h-1" />
      </>
    )
}

const columnHelper = createColumnHelper<TeamApplication>()

const columns = [
  columnHelper.accessor('id', {
    header: 'ID'
  }),
  columnHelper.accessor('status', {
    header: 'Estado',
    enableSorting: false
  }),
  columnHelper.accessor('role', {
    header: 'Rol',
    enableSorting: false
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
  columnHelper.accessor('createdAt', {
    header: 'Creado',
    cell: (info) => {
      return formatDate(new Date(info.getValue()))
    }
  }),
  columnHelper.accessor('updatedAt', {
    header: 'Actualizado',
    cell: (info) => {
      return formatDate(new Date(info.getValue()))
    }
  })
]

const ApplicationsList: FC = () => {
  const { manageError } = useManageError()
  const [applications, setApplications] = useState<TeamApplication[]>([])

  const table = useReactTable({
    data: applications,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    initialState: {
      columnVisibility: {
        id: false
      },
      sorting: [{ id: 'createdAt', desc: true }]
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel()
  })

  const getTeamApplications = useCallback(async (controller?: AbortController) => {
    const callController = controller ?? new AbortController()
    const response = await fetch('/api/team-applications', { signal: callController.signal })
    if (response.ok) {
      const teamApplicationList: TeamApplicationList = await response.json()
      setApplications(teamApplicationList.teamApplications)
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    getTeamApplications(controller)
      .catch((error) => {
        if (error instanceof Error && error.name === 'AbortError') return
        manageError(error, 'Error al obtener las aplicaciones', 'Error desconocido al obtener las aplicaciones', 'error')
      })
    return () => {
      controller.abort()
    }
  }, [])

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
              /> {column.columnDef.header?.toString() ?? column.id}
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
                      position: 'relative',
                      '&:hover > [data-is-resizing]': {
                        backgroundColor: 'border'
                      }
                    })}
                    style={{ minWidth: header.getSize() }}
                  >
                    <div
                      className={css({
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'small'
                      })}
                    >
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext()) }
                      {header.column.getCanSort() && (
                        <IconButton
                          size="small"
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          <FontAwesomeIcon icon={header.column.getIsSorted() === 'asc' ? faSortAsc : header.column.getIsSorted() === 'desc' ? faSortDesc : faSort} size="sm" fixedWidth />
                        </IconButton>
                      )}
                    </div>
                    <div>
                      {header.column.getCanFilter()
                        ? (
                          <div>
                            <Filter column={header.column} table={table} />
                          </div>
                        )
                        : null
                      }
                    </div>
                    <div
                      className={css({
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        height: '100%',
                        width: '5px',
                        cursor: 'col-resize',
                        userSelect: 'none',
                        touchAction: 'none',
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
          <FontAwesomeIcon icon={faChevronLeft} fixedWidth />
        </IconButton>
        Pagina {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
        <IconButton
          onClick={() => { table.nextPage() }}
          disabled={!table.getCanNextPage()}
        >
          <FontAwesomeIcon icon={faChevronRight} fixedWidth />
        </IconButton>
      </div>
    </>
  )
}

export default ApplicationsList
