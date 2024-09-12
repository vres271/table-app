import { createContext, useState, useEffect } from 'react';
import './App.css';
import { TableEditor } from './components/TableEditor/TableEditor';
import ThemesControl  from './components/ThemesControl';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getItems, isItemsLoading, selectItems } from './features/data/itemsSlice';

export enum Theme {
  Light = 'light',
  Dark = 'dark',
}
const initialTheme = Theme.Dark

export const ThemeContext = createContext<Theme>(initialTheme);

function App() {

  const [theme, setTheme] = useState<Theme>(initialTheme);

  const items = useAppSelector(selectItems);
  const isLoading = useAppSelector(isItemsLoading);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getItems());
  }, []);

  const handleThemeChange = (theme: Theme) => {
    setTheme(theme);
  }

  return (
    <ThemeContext.Provider value={theme}>
      <div className={'container' + (isLoading ? ' loading' : '')}>
        <ThemesControl theme={theme} themeChange={handleThemeChange}/>
        <TableEditor items={items} />
      </div>
    </ThemeContext.Provider>
  );

}

export default App;
