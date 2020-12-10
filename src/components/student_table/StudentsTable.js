import React, {useMemo} from 'react';
import {useTable, useSortBy, usePagination, useBlockLayout, useGlobalFilter, useFilters} from 'react-table';
import {useSticky} from 'react-table-sticky';
import {COLUMNS} from '../mockData/columns';
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { Button } from 'reactstrap';
import { Styles } from './TableStyles';
import { GlobalFilter} from './GlobalFilter';
import MOCK_DATA from '../mockData/MOCK_DATA.json';
import './sidenav/style.css'

export const StudentsTable = () => {

  const columns = useMemo(()=>COLUMNS, []);
  const data = useMemo(()=> MOCK_DATA, []);

  const {
    getTableProps, 
    getTableBodyProps, 
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    state,
    setGlobalFilter, 
    prepareRow
  } = useTable({
    columns,
    data
  },
  useBlockLayout,
  useSticky,
  useFilters,
  useGlobalFilter,
  useSortBy,
  usePagination,
  );
  const { pageIndex, pageSize, globalFilter } = state;

  return (
    <Styles>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>
      <div {...getTableProps()} className="table sticky" style={{ width: 1000, height: 500 }}>
        <div className="header">
          {headerGroups.map(headerGroup=>(
              <div {...headerGroup.getHeaderGroupProps()} className="tr">
                {headerGroup.headers.map(column=>(
                  <div {...column.getHeaderProps(column.getSortByToggleProps())} className="th">
                    {column.render('Header')}
                    <span>
                      {column.isSorted ? (column.isSortedDesc ? <FaArrowDown/> : <FaArrowUp/>) : ''}
                    </span>
                  </div>
                ))}
              </div>
          ))}
        </div>
        <div {...getTableBodyProps()} className="body">
          {
            page.map(row => {
              prepareRow(row)
              return (
                <div {...row.getRowProps()} className="tr">
                  {
                    row.cells.map( cell=> {
                      return  <div {...cell.getCellProps()} className="td">{cell.render('Cell')}</div>
                    })
                  }
                </div>
              )
            })
          }
         </div>
      </div>
      <div className='pagination-container'>
        <Button color='link' onClick={()=>gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</Button>
        <Button color='link' onClick={()=>previousPage()} disabled={!canPreviousPage}>Previous</Button>
        <span>Page{' '} <strong>{pageIndex+1} of {pageOptions.length}{' '}</strong></span>
        <span>
          | Go to page: {' '}
          <input type='number' defaultValue={pageIndex+1}
          onChange={e => {
            const pageNumber = e.target.value ? Number(e.target.value) -1 : 0
            gotoPage(pageNumber)
          }} 
          />
        </span>
        <select value={pageSize} onChange={e=> setPageSize(Number(e.target.value))}>
          {
            [10,25,50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))
          }
        </select>
        <Button color='link' onClick={()=>nextPage()} disabled={!canNextPage}>Next</Button>
        <Button color='link' onClick={()=>gotoPage(pageCount-1)} disabled={!canNextPage}>{'>>'}</Button>
      </div>
      </Styles>
  )
};
// const useStyles = makeStyles((theme) => ({
//   root: {
//     '& > *': {
//       marginTop: theme.spacing(2),
//     },
//   },
// }));

// export default function BasicPagination() {
//   const classes = useStyles();
//   return (
//     <div className={classes.root}>
//       <Pagination count={10} color="primary" />
//     </div>
//   );
// }