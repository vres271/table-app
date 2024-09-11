import { FC, FormEvent } from "react";
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

  return (
    <form className="table-form">
        { item 
            ? Object.entries(item).map(([key, value]) => 
                <div className="control">
                    <label>{key}</label>
                    <input value={value}></input>
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