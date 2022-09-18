import React, { useContext } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './store/AuthContext'

function App() {
  // 取得 AuthContext 的 state
  const ctx = useContext(AuthContext)
  /**
   * <AuthContext> 並非 component，需用 .Provider 作為 component 才能用在 JSX 中
   * <AuthContext.Provider> 內的 components 才能取得 context state
   */
  return (
    <React.Fragment>
      <MainHeader />
      <main>
        {!ctx.isLoggedIn && <Login />}
        {ctx.isLoggedIn && <Home />}
      </main>
    </React.Fragment>
  );
}

export default App;
