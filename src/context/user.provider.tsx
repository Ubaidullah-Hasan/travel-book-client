import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { TUser } from "../types";
import { getCurrentUser } from "../services/authService";

// Create the UserContext
export const UserContext = createContext<IUserProviderValues | undefined>(
  undefined
);

interface IUserProviderValues {
  user: TUser | null;
  isLoading: boolean;
  setUser: (user: TUser | null) => void;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<TUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleUser = async () => {
    const user = await getCurrentUser();

    setUser(user);
    setIsLoading(false);
  };



  useEffect(() => {
    handleUser();
  }, [isLoading]);

  const initialValue = {
    user,
    setUser,
    isLoading,
    setIsLoading
  };

  return (
    <UserContext.Provider value={initialValue}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

// useUser hook to access context
export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within the UserProvider context");
  }

  return context;
};
