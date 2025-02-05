import React, { useState } from 'react'
import AlertContext from './AlertContext'

export default function AlertState(props) {
  const [alert, setAlert] = useState(null);

  const showAlert = (type, msg) => {
    setAlert({
      type : type,
      msg : msg
    });

    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };


  return (
  <AlertContext.Provider value = {{alert, showAlert}}>
            {props.children}
  </AlertContext.Provider>)
}
