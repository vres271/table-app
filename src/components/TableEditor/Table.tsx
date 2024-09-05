import { FC, ReactNode } from "react";

export interface ITableProps {
  children: ReactNode
}

export const Table:FC<ITableProps> = ({ children }) => {
  return (
    <table>
      { children }
    </table>
  );
}