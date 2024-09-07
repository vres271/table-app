import { FC, ReactNode } from "react";
import { IItem } from "./model";

export interface BodyProps {
  items: IItem[];
  renderRow: (item: IItem, i: number) => ReactNode;
}

export const Body:FC<BodyProps> = ({ items, renderRow }) => {

  return (
    <tbody>{ items.map((item, i) => renderRow(item, i)) }</tbody>
  );

}