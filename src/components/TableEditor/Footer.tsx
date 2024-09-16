import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../redux-toolkit/hooks";
import { decrement, selectCount } from "../../redux-toolkit/features/counter/counterSlice";

export interface IFooterProps {
}

export const Footer: FC<IFooterProps> = () => {

  // const count = useAppSelector(selectCount);
  // const dispatch = useAppDispatch();  // чисто для теста сюда затащил

  return (
    <tfoot>
      <tr>
        <td colSpan={99}>Footer  
          {/* (<span onClick={() => dispatch(decrement())} 
          style={{cursor: 'pointer'}}>{count})</span> */}
        </td>
      </tr>
    </tfoot>
  );

}