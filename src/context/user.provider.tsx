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

// UserProvider component
const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<TUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleUser = async () => {
    try {
      const user = await getCurrentUser();

      if (user) {
        setUser(user);
      } else {
        console.log("No user found, maybe not logged in.");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setIsLoading(false);
    }
  };


  // Fetch user on component mount
  useEffect(() => {
    handleUser();
  }, []); // Empty array to run once on mount

  const initialValue = { user, setUser, isLoading, setIsLoading };

  return (
    <UserContext.Provider value={initialValue}>
      {isLoading ? <div>Loading...</div> : children} {/* Add loading state */}
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
