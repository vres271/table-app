import { FC } from "react";
import { Theme } from "../App";
import './ThemesControl.css'

export interface IThemesControlProps {
	theme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export const ThemesControl: FC<IThemesControlProps> = ({theme, onThemeChange}) => {

	const handleThemeClick = (theme: Theme) => {
		onThemeChange(theme);
  }
		
  return (
    <div className="themes-control" > { [Theme.Dark, Theme.Light].map(t =>
      <div
        key={t}
        className={ theme === t ? 'active' : ''}
        onClick = {() => handleThemeClick(t)}>
      { t }
      </div>
    )}
    </div>
  );

}