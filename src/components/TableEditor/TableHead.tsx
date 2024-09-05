import { FC } from "react";
import { IItem, ITableSort } from "./TableEditor";
import { TableHeadCell } from "./TableHeadCell";

export interface ITableHeadProps {
	item: IItem;
	onSortBy: (columnName: string)=>void;
	sort?: ITableSort;
}

export const TableHead:FC<ITableHeadProps> = ({item, sort, onSortBy}) => {
  const blackList = [
    'description',
    'url',
    'email',
  ]

  return (
		<thead>
			<tr>
				{
					[...Object.entries(item)]
						.filter(([key, value]) => !blackList.includes(key))
						.map(([key, value], i) => 
							<TableHeadCell 
								key={i} 
								name={key} 
								active={sort?.by === key}
								direction={!!sort?.order}
								onSortBy={onSortBy}/>
					)
				}
			</tr>
		</thead>
  );

}