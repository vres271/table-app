import { FC, FormEvent, useEffect, useState } from "react";
import { IItem } from "../model";
import './Form.css'

export interface IFormProps {
  item?: IItem;
  onSubmit: (item: IItem) => void;
  onCancel: () => void;
}

export const Form:FC<IFormProps> = ({ item, onSubmit, onCancel }) => {

  const [itemData, setItemData] = useState<IItem>({id: 0});

  useEffect(() => {
    setItemData(item || {id: 0})
  }, [item])

  const valueChange = (e: FormEvent<HTMLInputElement>, colName: string) => {
    if (itemData) {
      setItemData({
        ...itemData,
        [colName]: e.currentTarget.value,
      });
    }
  }

  const cancel = (e: FormEvent) => {
		e.preventDefault();
		onCancel();
	}

  const submit = (e: FormEvent) => {
		e.preventDefault();
		onSubmit(itemData);
	}

  return (
    <form className="table-form">
        { itemData 
            ? Object.entries(itemData).map(([key, value]) => 
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