import { useState, useEffect } from "react";

function useLoggedUser(){
  const [user, setUser] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("User");
    if (user) {
        setUser(user);
    }

  }, []);

  return [user];
};

export default useLoggedUser;