import { createContext, useState }  from "react";
export const UserContext = createContext(null);

const UserStore = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [received, setReceived] = useState("");
  const [joinDate, setJoinDate] = useState("");


  return (
    <UserContext.Provider value={{ isLoggedIn ,setIsLoggedIn, received, setReceived, joinDate, setJoinDate}}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserStore;
