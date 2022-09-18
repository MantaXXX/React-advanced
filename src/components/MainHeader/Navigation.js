import React, { useContext } from 'react';

import classes from './Navigation.module.css';
import AuthContext from '../../store/AuthContext';

const Navigation = () => {
  // 使用 useContext 來接引用的 AuthContext，並將參數傳至 JSX 使用
  const ctx = useContext(AuthContext)
  /**
   * 要使用 <AuthContext> 內的 state，需要在 JSX 使用 .Consumer
   * 且包含一個有 (ctx) => {} 在內的 {}
   * {(ctx) => {}}，ctx 為 createContext 所傳的參數
   */
  return (
    <nav className={classes.nav} >
      <ul>
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <button onClick={ctx.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
