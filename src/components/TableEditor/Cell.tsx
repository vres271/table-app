import { FC } from "react";

export interface CellProps {
  value: any;
  onSwitch?: (value: boolean) => void;
  onClick?: () => void;
} 

export const Cell:FC<CellProps> = ({value, onSwitch, onClick}) => {

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
    <td onClick={onClick}>{inner}</td>
  );

}