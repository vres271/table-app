import { FC, FormEvent, useState } from "react";
import { IItem } from "../model";
import './Form.css'

export interface IFormProps {
  item?: IItem;
  onSubmit: () => void;
  onCancel: () => void;
}

export const Form:FC<IFormProps> = ({ item, onSubmit, onCancel }) => {

  const cancel = (e: FormEvent) => {
		e.preventDefault();
		onCancel();
	}

  const submit = (e: FormEvent) => {
		e.preventDefault();
		onSubmit();
	}

  const [itemData, setItemData] = useState<IItem | undefined>(undefined);
  
  const valueChange = (e: FormEvent<HTMLInputElement>, colName: string) => {
    const changedData:IItem = itemData || {id: 0};
    changedData[colName] = e.currentTarget.value;
    setItemData(changedData);
  }

  return (
    <form className="table-form">
        { item 
            ? Object.entries(item).map(([key, value]) => 
                <div className="control" key={key}>
                    <label>{key}</label>
                    <input value={value} onChange={e => valueChange(e, key)}></input>
                </div>
            )
            : '' 
        }
        <footer>
            <button onClick={submit} className="primary">Save</button>
            <button onClick={cancel}>Cancel</button>
        </footer>
    </form>
  );

}