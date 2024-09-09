import { FC } from "react";
import { Theme } from "../App";
import './ThemesControl.css'
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { increment, selectCount } from "../features/counter/counterSlice";

export interface IThemesControlProps {
	theme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export const ThemesControl: FC<IThemesControlProps> = ({theme, onThemeChange}) => {

  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();

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
      <div onClick={() => dispatch(increment())}>{count}</div>
    </div>
  );

}