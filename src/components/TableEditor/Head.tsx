import { FC, ReactNode } from "react";

export interface IHeadProps {
	children: ReactNode;
}

export const Head:FC<IHeadProps> = ({children}) => {

  return (
		<thead>
			{ children }
		</thead>
  );

}