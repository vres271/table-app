import { FC, ReactNode } from "react";

export interface IProps {
  children: ReactNode
}

export const Table:FC<IProps> = ({ children }) => {
  return (
    <table>
      { children }
    </table>
  );
}