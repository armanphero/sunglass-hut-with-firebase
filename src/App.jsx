import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import { createContext, useState } from 'react'

export const UserInfoContext = createContext([]);
function App() {
  const [userInfo, setUserInfo] = useState({});

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
