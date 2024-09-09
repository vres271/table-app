import { createContext, useState, useEffect } from 'react';
import './App.css';
import { TableEditor } from './components/TableEditor/TableEditor';
// import { testItems } from './mocks/items';
import { ThemesControl } from './components/ThemesControl';
import { IItem } from './components/TableEditor/model';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { selectItems, set } from './features/data/itemsSlice';

const API_URL = 'https://jsonplaceholder.typicode.com';
export enum EntityRout {
  Posts = 'posts'
}

export enum Theme {
  Light = 'light',
  Dark = 'dark',
}
const initialTheme = Theme.Dark

export const ThemeContext = createContext<Theme>(initialTheme);

function App() {

  const [theme, setTheme] = useState<Theme>(initialTheme);
  // const [items] = useState(testItems);
  // const [items, setItems] = useState<IItem[]>([]);

  const items = useAppSelector(selectItems);
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    try {
      const response = await fetch(`${API_URL}/${EntityRout.Posts}`)
      const items: IItem[] = await response.json();
      // setItems(items);
      dispatch(set(items));
    } catch (error) {
      console.warn(`Error on ${EntityRout.Posts} get`, error)
    }
  }

  const handleThemeChange = (theme: Theme) => {
    setTheme(theme);
  }

  return (
    <ThemeContext.Provider value={theme}>
      <ThemesControl theme={theme} onThemeChange={handleThemeChange}/>
      <div className='container'>
        <TableEditor items={items} />
      </div>
    </ThemeContext.Provider>
  );

}

export default App;
