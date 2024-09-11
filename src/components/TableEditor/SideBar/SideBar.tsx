import { FC, ReactNode } from "react";
import './SideBar.css'

export interface ISideBarProps {
  visible: boolean;
  title?: string;
  children: ReactNode;
  onClose: () => void;
}

export const SideBar:FC<ISideBarProps> = ({ children, title, visible, onClose }) => {

  const asideClases = `table-sidebar ${visible ? 'visible' : ''}`;
  return (
    <aside className={asideClases}>
        <header>
          <span>{title}</span> 
          <span onClick={onClose} className="closer">X</span> 
        </header>
        <main>{children}</main>
    </aside>
  );

}