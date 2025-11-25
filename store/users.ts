import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserState {
  userId: number | null;
  setUserId: (newUserId: number) => void;
  userEmail: string;
  setUserEmail: (newUserEmail: string) => void;
  userLevel: string;
  setUserLevel: (userLevel: string) => void;
  pocaStorePermissionLevel: string;
  setPocaStorePermissionLevel: (level: string) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const useUserStore = create(
  persist<UserState>(
    (set) => ({
      userId: null,
      setUserId: (newUserId: number) => set({ userId: newUserId }),
      userEmail: '',
      setUserEmail: (newUserEmail: string) => set({ userEmail: newUserEmail }),
      userLevel: '',
      setUserLevel: (userLevel: string) => set({ userLevel }),
      pocaStorePermissionLevel: '',
      setPocaStorePermissionLevel: (level: string) =>
        set({ pocaStorePermissionLevel: level }),
      isAuthenticated: false,
      setIsAuthenticated: (isAuthenticated: boolean) =>
        set({ isAuthenticated }),
      isLoading: false,
      setIsLoading: (isLoading: boolean) => set({ isLoading }),
    }),
    {
      name: 'userInfoStorage',
    },
  ),
);

export default useUserStore;
