import React, { useState, useEffect, createContext } from "react";
import { LoginInputDto, User } from "types/User";
import { post as loginPost } from "requests/auth";
import { getStoragedObject } from "utils/store";

interface LoginContextData {
  loggedUser: User;
  setLoggedUser: Function;
  login: Function;
}

export const AuthContext = createContext<LoginContextData>(
  {} as LoginContextData
);

const AuthProvider = (props: { children: React.ReactNode }) => {
  const [loggedUser, setLoggedUser] = useState<User>({} as User);

  const login = async (user: LoginInputDto) => {
    const response = await loginPost(user);
    if (response.user) {
      localStorage.clear();
      setLoggedUser(response.user as User);
      localStorage.setItem("user", JSON.stringify(response.user));
      localStorage.setItem("token", response.token);
      return response;
    }
    return response;
  };

  useEffect(() => {
    const loadStoragedData = () => {
      const storagedUser = getStoragedObject("user");
      const storagedToken = getStoragedObject("token");

      if (storagedUser && storagedToken)
        setLoggedUser(JSON.parse(storagedUser));
    };
    loadStoragedData();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedUser, setLoggedUser, login }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
