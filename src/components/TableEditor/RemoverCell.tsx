import { FC, memo } from "react";
import { IItem } from "./model";

export interface IRemoverCellProps {
  item: IItem;
  onRemoveClick: (item: IItem) => void;
}

export const RemoverCell:FC<IRemoverCellProps> = memo(({item, onRemoveClick}) => {

  const handleClick = () => {
    onRemoveClick(item);
  }

  return (
    <td onClick={() => handleClick()} className="delete" title={`rendered: ${new Date().getMilliseconds()}`}>X</td>
  );
})