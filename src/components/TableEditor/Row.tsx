import { FC, ReactNode } from "react";

export interface RowProps {
  values: any[];
  selected?: boolean;
  renderRow: (value: any, i: number) => ReactNode;
  onCLick?: () => void;
}

export const Row:FC<RowProps> = ({ values, selected, renderRow, onCLick }) => {
  return (
    <tr onClick={onCLick} className={selected ? 'selected' : undefined}>{ values.map((value, i) => renderRow(value, i)) }</tr>
  );
}