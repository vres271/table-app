import { createContext, useState } from 'react';
import './App.css';
import { TableEditor } from './components/TableEditor/TableEditor';
import { testItems } from './mocks/items';
import { ThemesControl } from './components/ThemesControl';

export enum Theme {
  Light = 'light',
  Dark = 'dark',
}
const initialTheme = Theme.Dark

export const ThemeContext = createContext<Theme>(initialTheme);

function App() {

  const [theme, setTheme] = useState<Theme>(initialTheme);
  const [items] = useState(testItems);

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
