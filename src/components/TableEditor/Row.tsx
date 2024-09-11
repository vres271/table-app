import { FC, ReactNode } from "react";

export interface RowProps {
  values: any[];
  renderRow: (value: any, i: number) => ReactNode;
  onCLick?: () => void;
}

export const Row:FC<RowProps> = ({ values, renderRow, onCLick }) => {
  return (
    <tr onClick={onCLick}>{ values.map((value, i) => renderRow(value, i)) }</tr>
  );
}