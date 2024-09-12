import { FC, ReactNode } from "react";

export interface RowProps {
  values: any[];
  selected?: boolean;
  loading?: boolean;
  renderRow: (value: any, i: number) => ReactNode;
  onClick?: () => void;
  children?: ReactNode; 
}

export const Row:FC<RowProps> = ({ values, selected, loading,  renderRow, onClick , children}) => {
  let classes = [];
  if (selected) { classes.push('selected'); }
  if (loading) { classes.push('loading'); }

  return (
    <tr onClick={onClick} className={classes.join(' ') || undefined}>
      { values.map((value, i) => renderRow(value, i)) }
      { children }
    </tr>
  );
}