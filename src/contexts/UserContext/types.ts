import { iLoginFormValues } from "../../components/Forms/LoginForm/types";
import { iRegisterFormValues } from "../../components/Forms/RegisterForm/types";
import { iHabits } from "../HabitsContext/types";

export interface iUserProviderProps {
  children: React.ReactNode;
}

export interface iUserContext {
  globalLoading: boolean;
  setGlobalLoading: React.Dispatch<React.SetStateAction<boolean>>;
  userLogin: (userData: iLoginFormValues) => Promise<void>;
  userRegister: (userData: iRegisterFormValues) => Promise<void>;
  userLogout: () => void;
  getUsersList: () => Promise<iUser[] | undefined>
  user: iUser | null;
}

export interface iUser {
  email: string;
  img: string;
  name: string;
  userName: string;
  id: string;
  habits: iHabits[]
  bits: number

export interface ILoginResponse {
  accessToken: string;
  user: iUser;
}

export interface IRegisterResponse {
  accessToken: string;
  user: iUser;
}
