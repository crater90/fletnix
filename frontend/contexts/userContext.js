import { createContext, useState } from "react";
const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState('');
  const [userAge, setUserAge] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState();
  return (
    <UserContext.Provider value={{ userEmail, setUserEmail, userAge, setUserAge, isLoggedIn, setIsLoggedIn }}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }