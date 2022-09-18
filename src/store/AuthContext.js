import React, { useState, useEffect } from "react";

/**
 * React.createContext 建立 context 存入 state，可以是 {}, String, Number...
 */
const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => { },
  onLogin: (email, password) => { }
})

// 將 login / logout 邏輯移至 context，並包在 <App> 最外層
export const AuthContextProvider = (props) => {
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

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler
      }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext