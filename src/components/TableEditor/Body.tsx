import { FC, ReactNode } from "react";

export interface BodyProps {
  children: ReactNode;
}

export const Body:FC<BodyProps> = ({ children }) => {

  return (
    <tbody>{ children }</tbody>
  );
}