import { createContext, useState } from 'react';
import './App.css';
import ThemesControl  from './components/ThemesControl';
import { useAppDispatch, useAppSelector } from './redux-toolkit/hooks';
import { isItemsLoading } from './redux-toolkit/features/data/itemsSlice';
import { TableEditorRedux } from './components/TableEditor/TableEditorR';
import { TableEditorReduxToolkit } from './components/TableEditor/TableEditorRT';

export enum Theme {
  Light = 'light',
  Dark = 'dark',
}
const initialTheme = Theme.Dark

export const ThemeContext = createContext<Theme>(initialTheme);

function App() {

  const [theme, setTheme] = useState<Theme>(initialTheme);

  const isLoading = useAppSelector(isItemsLoading);

  const dispatch = useAppDispatch();

  const handleThemeChange = (theme: Theme) => {
    setTheme(theme);
  }

  return (
    <ThemeContext.Provider value={theme}>
      <div className={'container' + (isLoading ? ' loading' : '')}>
        <ThemesControl theme={theme} themeChange={handleThemeChange}/>
        {/* <TableEditorRedux/> */}
        <TableEditorReduxToolkit/>
      </div>
    </ThemeContext.Provider>
  );

}

export default App;
