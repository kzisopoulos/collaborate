import { User } from "firebase/auth";
import { createContext, useEffect, useReducer } from "react";
import { projectAuth } from "../firebase/config";

interface IProps {
  children: React.ReactNode;
}

interface AuthState {
  user: User | null;
  authIsReady: boolean;
  dispatch?: React.Dispatch<AuthActions> | any;
}

export interface AuthActions {
  type: "LOGIN" | "LOGOUT" | "AUTH_IS_READY";
  payload: any;
}

const initialState: AuthState = {
  user: null,
  authIsReady: true,
};

export const AuthContext = createContext<AuthState>(initialState);

export const authReducer = (state: AuthState, action: AuthActions) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    case "AUTH_IS_READY":
      return { ...state, user: action.payload, authIsReady: true };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const unsub = projectAuth.onAuthStateChanged((user) => {
      if (user) {
        dispatch({ type: "AUTH_IS_READY", payload: user });
      } else {
        dispatch({ type: "LOGOUT", payload: null });
      }
      unsub();
    });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
