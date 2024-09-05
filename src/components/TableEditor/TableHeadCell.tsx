import { FC } from "react";

export interface ITableHeadCellProps {
  name: string;
  onSortBy: (columnName: string)=>void;
  active: boolean;
  direction: boolean;
} 

export const TableHeadCell:FC<ITableHeadCellProps> = ({name, active, direction, onSortBy}) => {

  const handleClick = () => {
    onSortBy(name)
  }

  return (
    <th 
      onClick={handleClick} 
      className={(active ? 'active' : '')+' '+ (active ? (direction ? 'direction-down' : 'direction-up') : '')}
    >{name}</th>
  );
}