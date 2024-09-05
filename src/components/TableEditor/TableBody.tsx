import { FC } from "react";
import { TableRow } from "./TableRow";
import { IItem } from "./TableEditor";

export interface TableBodyProps {
  items: IItem[];
}

export const TableBody:FC<TableBodyProps> = ({items}) => {
  return (
    <tbody>
        {
          [...items].map((item, i) => 
            <TableRow key={item?.id} item={{...item}}/>
          )
        }
    </tbody>
  );
}