import { FC } from "react";
import { TableCell } from "./TableCell";
import { IItem } from "./TableEditor";

export interface TableRowProps {
  item: IItem;
}  

export const TableRow:FC<TableRowProps> = ({item}) => {

  const blackList = [
    'description',
    'url',
    'email',
  ]

  return (
    <tr>
        {
            [...Object.entries(item)]
              .filter(([key, value]) => !blackList.includes(key))
              .map(([key, value], i) => 
                <TableCell key={i} value={value} />
            )
        }
    </tr>
  );
}