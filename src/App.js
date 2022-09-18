import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './store/AuthContext';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /**
   * useEffect 第二個參數 [] 為空時, 只在 component 第一次 rendered 時執行一次
   * 藉此來查找 localStorage
   */
  useEffect(() => {
    const storedUserLoginInfo = localStorage.getItem('isLoggedIn')

    if (storedUserLoginInfo === '1') {
      setIsLoggedIn(true)
    }

  }, [])

  const loginHandler = (email, password) => {
    localStorage.setItem('isLoggedIn', '1')
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn')
    setIsLoggedIn(false);
  };
  /**
   * <AuthContext> 並非 component，需用 .Provider 作為 component 才能用在 JSX 中
   * <AuthContext.Provider> 內的 components 才能取得 context state
   */
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn
      }}>
      <MainHeader onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </AuthContext.Provider>
  );
}

export default App;
