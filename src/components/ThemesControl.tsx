import { FC } from "react";
import { Theme } from "../App";
import './ThemesControl.css'
import { increment, selectCount } from "../redux-toolkit/features/counter/counterSlice";
import { connect, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux-toolkit/store";
import { IUser, selectUser, setUser } from "../redux-toolkit/features/user/userSlice";
import { useAppSelector } from "../redux-toolkit/hooks";

interface StateProps {
	count: number;
  user: IUser | null;
}

interface DispatchProps {
  countClick: () => void;
  authClick: () => void;
}

interface OwnProps {
	theme: Theme;
  themeChange: (theme: Theme) => void;
}

type IThemesControlProps = StateProps & DispatchProps & OwnProps

const mapStateToProps = (state: RootState)  => ({
  count: selectCount(state),
  user: selectUser(state).user,
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  countClick: () => dispatch(increment()),
  authClick: () => dispatch(setUser({id: 1, name: 'user1', email: ''})),
})


const ThemesControl: FC<IThemesControlProps> = ({theme, user, count, themeChange, countClick, authClick}) => 
  (
    <div className="themes-control" > 
      <div onClick={countClick}>{count}</div>
      <div>{
        user 
          ? user?.name 
          : <div onClick={authClick}>auth</div>}</div>
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


