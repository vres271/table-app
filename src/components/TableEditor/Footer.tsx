import { FC } from "react";

export interface IFooterProps {
}

export const Footer:FC<IFooterProps> = () => {


  return (
		<tfoot>
			<tr>
                <td colSpan={99}>Footer</td>
			</tr>
		</tfoot>
  );

}