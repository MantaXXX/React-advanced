import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

/**
 * @param preState 先前的 snapShot
 * @param action   由 dispatchEmail 傳進來的參數
 */
const emailReducer = (preState, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.value, isValid: action.value.includes('@') }
  }
  if (action.type === 'USER_CLEAR') {
    return { value: preState.value, isValid: preState.value.includes('@') }
  }
  return { value: '', isValid: false }
}
const passwordReducer = (preState, action) => {
  if (action.type === 'USER_PASSWORD') {
    return {
      value: action.value,
      isValid: action.value.trim().length > 6
    }
  }
  if (action.type === 'USER_CLEAR') {
    return {
      value: preState.value,
      isValid: preState.value?.trim().length > 6
    }
  }
  return { value: '', isValid: false }
}



const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  /**
   * 使用 useReducer 來整合 enterEmail, emailIsValid 兩個 state
   * @param emailState
   * @param dispatchEmail 傳遞參數來執行 useReducer() 第一個參數函式
   * @param useReducer 第一參數 emailReducer 為 dispatchEmail 所呼叫的函式
   * @param useReducer 第二參數 emailState 初始值
   */
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: false
  })
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: false
  })

  /**
   * useEffect 第二變數放入偵測值，當變數有變動時執行 function，藉此簡化相關 code
   * @不需要放入的變數
   * @params  state updating function: setFormIsValid...
   * @params built-in APIs or function: fetch(), localStorage...
   * @params variable/functions outside of components
   *
   * @清除函式
   * @return ()=>{} 除了第一次 useEffect 執行以外，之後每次 useEffect 執行前，會先 return ()=>{} 函式
   * 可以避免 useEffect 重複呼叫 API...等等
   */
  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('change')
      setFormIsValid(
        emailState.isValid && passwordState.isValid
      );
    }, 500)

    return () => { clearTimeout(identifier) }

  }, [emailState.isValid, passwordState.isValid])

  const emailChangeHandler = (event) => {
    // 傳遞的參數可以是 Obj, String, Number
    dispatchEmail({
      type: 'USER_INPUT',
      value: event.target.value
    })

    // setFormIsValid(emailState.isValid && passwordState.isValid)
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({
      type: 'USER_PASSWORD',
      value: event.target.value,
    })

    // setFormIsValid(emailState.isValid && passwordState.isValid)
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: 'USER_CLEAR' })
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: 'USER_CLEAR' })
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${emailState.isValid === false ? classes.invalid : ''}`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${passwordState.isValid === false ? classes.invalid : ''}`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
