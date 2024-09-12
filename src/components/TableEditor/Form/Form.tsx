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

  const valueChange = (value: any, colName: string) => {
    if (itemData) {
      setItemData({
        ...itemData,
        [colName]: value,
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

  const getInputByType = (key: string, value: any) => {
    switch (typeof value) {
      case 'number':
        return <input type="number" value={value} onChange={e => valueChange(+e.currentTarget.value, key)}></input>
      case 'boolean':
        return <input type="checkbox" checked={!!value} onChange={e => valueChange(e.currentTarget.checked, key)}></input>
      default:
        return <input type="text" value={value} onChange={e => valueChange(e.currentTarget.value, key)}></input>
    }
  }

  return (
    <form className="table-form">
        { itemData 
            ? Object.entries(itemData).map(([key, value]) => 
                key !== 'id'
                ? <div className="control" key={key}>
                    <label>{key}</label>
                    { getInputByType(key, value) }
                  </div>
                : ''
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