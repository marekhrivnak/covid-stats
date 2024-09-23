import React, { useMemo } from 'react'
import { useTable, useSortBy, useGlobalFilter } from 'react-table'
import { COLUMNS } from './columns'
import './table.css'
import {Filter} from './Filter'


const clickHandler = (redirectData) => {
  window.location.href='/country/'+redirectData.id;
}

export const BasicTable = ({my_covid_data}) => {
  const columns = useMemo(() => COLUMNS, [])
  const data = my_covid_data

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable({
    columns,
    data,
  },
  useGlobalFilter,
  useSortBy )

const {globalFilter} = state

  return (
    <>
    <Filter filter={globalFilter} setFilter={setGlobalFilter} />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps )}>
                    {column.render('Header')}

                    
                    </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()} onClick={() => clickHandler(row.original)}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')} </td>
                })}
              </tr>
            )
          })}
        </tbody>
        <tfoot>
          {footerGroups.map(footerGroup => (
            <tr {...footerGroup.getFooterGroupProps()}>
              {footerGroup.headers.map(column => (
                <td {...column.getFooterProps()}>{column.render('Footer')}</td>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </>
  )
}