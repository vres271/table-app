import { FC } from "react";

export interface IHeadCellProps {
  name: string;
  onSortBy?: (columnName: string)=>void;
  active?: boolean;
  direction?: boolean;
} 

export const HeadCell:FC<IHeadCellProps> = ({name, active, direction, onSortBy}) => {

  const handleClick = () => {
    onSortBy && onSortBy(name)
  }

  return (
    <th 
      onClick={handleClick} 
      className={(active ? 'active' : '')+' '+ (active ? (direction ? 'direction-down' : 'direction-up') : '')}
    >{name}</th>
  );
}