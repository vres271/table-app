import { FC } from "react";
import { IPaging } from "./model";

export interface IPaginatorProps {
  count: number;
  paging: IPaging;
  onPageChange: (page: number) => void
  onRowOnPageChange: (rowsOnPage: number) => void
}

export const Paginator: FC<IPaginatorProps> = ({ count, paging, onPageChange, onRowOnPageChange }) => {
 
  const handlePageClick = (page: number) => {
    onPageChange(page)
  }

  const handleRowOnPageClick = (n: number) => {
    onRowOnPageChange(n);
  }

  const pagesCount = Math.ceil(count / paging.rowsOnPage);
  const pagesBlock = Array(pagesCount).fill(null).map((x, i) => {
    const page = i + 1;
    return <div 
      key={i}
      className={page === paging.curentPage ? 'active' : ''} 
      onClick={() => handlePageClick(page)}>
        { page }
      </div>
  })
  const rowsOnPageBlock = [10,20,50,100,500].map(n => {
    return <div
      key={n}
      className={n === paging.rowsOnPage ? 'active' : ''}
      onClick={() => handleRowOnPageClick(n)}>
        {n}
      </div>
  })

  return (
    <div className="paginator">
      <div className="pages">{ pagesBlock }</div>
      <div className="rows-on-page">{ rowsOnPageBlock }</div>
    </div>
  );

}