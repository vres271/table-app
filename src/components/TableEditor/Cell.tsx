import { FC } from "react";

export interface CellProps {
  value: any;
  onSwitch?: (value: boolean) => void;
} 

export const Cell:FC<CellProps> = ({value, onSwitch}) => {

  let _value;
  switch (typeof value) {
    case 'number':
    case 'boolean':
    case 'string':
      _value = value
      break;
    default:
      _value = '';
      break;
  }

  const inner = typeof value !== 'boolean' 
    ? value 
    : <input 
        type="checkbox" 
        checked={!!value} 
        onChange={() => onSwitch && onSwitch(!value)}>
    </input>

  return (
    <td>{inner}</td>
  );

}