import { FC, ReactNode } from "react";

export interface ICaptionProps {
  name?: string;
  children: ReactNode;
}

export const Caption:FC<ICaptionProps> = ({ children, name }) => {


  return (
    <caption>{name} { children }</caption>
  );

}