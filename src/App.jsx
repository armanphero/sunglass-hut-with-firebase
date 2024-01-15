import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import { createContext, useEffect, useState } from 'react'
import firebase from 'firebase/compat/app'
import { app, firebaseConfig } from './firebase/firebase.config'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export const UserInfoContext = createContext([]);
function App() {
  const [userInfo, setUserInfo] = useState({});
  const [user, setUser] = useState(null);
  firebase.initializeApp(firebaseConfig);


  useEffect(() => {

    const unsubscriber = onAuthStateChanged(firebase.auth(),
      (currentUser) => {
        console.log(currentUser);
        setUser(currentUser);
      });
    return unsubscriber();

  }, [])

  return (
    <>
      <UserInfoContext.Provider value={[userInfo, setUserInfo]}>
        <Header />
        <Outlet />
      </UserInfoContext.Provider>
    </>
  )
}

export default App
