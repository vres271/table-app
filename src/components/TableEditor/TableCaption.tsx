import { FC, ReactNode } from "react";

export interface ITableCaptionProps {
    children: ReactNode;
}

export const TableCaption:FC<ITableCaptionProps> = ({ children }) => {


  return (
    <caption>{ children }</caption>
  );

}