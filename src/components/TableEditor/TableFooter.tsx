import { FC } from "react";

export interface ITableFooterProps {
}

export const TableFooter:FC<ITableFooterProps> = () => {


  return (
		<tfoot>
			<tr>
                <td colSpan={99}>Footer</td>
			</tr>
		</tfoot>
  );

}