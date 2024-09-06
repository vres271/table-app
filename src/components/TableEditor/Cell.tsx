import { FC } from "react";

export interface CellProps {
    value: any;
} 

export const Cell:FC<CellProps> = ({value}) => {

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