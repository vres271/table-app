import { FC, ReactNode } from "react";
import { IItem } from "./model";

export interface RowProps {
  values: any[];
  renderRow: (value: any, i: number) => ReactNode;
}

export const Row:FC<RowProps> = ({ values, renderRow }) => {
  return (
    <tr>{ values.map((value, i) => renderRow(value, i)) }</tr>
  );
}