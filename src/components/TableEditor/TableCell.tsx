import { FC } from "react";

export interface TableCellProps {
    value: any;
} 

export const TableCell:FC<TableCellProps> = ({value}) => {

  let _value;
  switch (typeof value) {
    case 'number':
    case 'string':
      _value = value
      break;
    default:
      _value = '';
      break;
  }

  return (
    <td>{_value}</td>
  );
}