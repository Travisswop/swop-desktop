import { create } from "zustand";

interface WalletState {
  account: string;
  balance: string;
}

interface UserState {
  user: any | null;
  wallet: WalletState | null;
}

interface UserStore {
  state: UserState;
  setUser: (user: any) => void;
  setWallet: (wallet: WalletState | null) => void;
}

const useLoggedInUserStore = create<UserStore>((set, get) => ({
  state: {
    user: null,
    wallet: null,
  },
  setUser: (user: any) =>
    set((state) => ({
      state: {
        ...state.state,
        user,
      },
    })),
  setWallet: (wallet: WalletState | null) => {
    console.log('Setting wallet data:', wallet);
    set((state) => ({
      state: {
        ...state.state,
        wallet,
      },
    }));
    // Log the state after setting wallet data
    console.log('State after setting wallet data:', get().state);
  },
}));

export default useLoggedInUserStore;
