import { FC } from "react";
import { Theme } from "../App";
import './ThemesControl.css'
import { increment, selectCount } from "../features/counter/counterSlice";
import { connect } from "react-redux";
import { AppDispatch, RootState } from "../app/store";

interface StateProps {
	count: number;
}

interface DispatchProps {
  countClick: () => void;
}

interface OwnProps {
	theme: Theme;
  themeChange: (theme: Theme) => void;
}

type IThemesControlProps = StateProps & DispatchProps & OwnProps

const mapStateToProps = (state: RootState)  => ({
  count: selectCount(state),
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  countClick: () => dispatch(increment())
})

const ThemesControl: FC<IThemesControlProps> = ({theme, count, themeChange, countClick}) => 
  (
    <div className="themes-control" > 
      <div onClick={countClick}>{count}</div>
      { [Theme.Dark, Theme.Light].map(t =>
        <div
          key={t}
          className={ theme === t ? 'active' : ''}
          onClick = {() => themeChange(t)}>
        { t }
        </div>
      )}
    </div>
  );

export default connect(mapStateToProps, mapDispatchToProps)(ThemesControl);


