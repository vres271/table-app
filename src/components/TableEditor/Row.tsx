import { FC, ReactNode } from "react";

export interface RowProps {
  children: ReactNode;
}  

export const Row:FC<RowProps> = ({children}) => {
  return (
    <tr>{ children }</tr>
  );
}