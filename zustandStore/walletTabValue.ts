import { create } from 'zustand';

type Store = {
  selectTabValue: string;
  selectTabViewValue: string;
  setSelectTabValue: (tab: string) => void;
  setSelectTabViewValue: (view: string) => void;
};

const useWalletTabValue = create<Store>((set) => ({
  selectTabValue: 'wallet',
  selectTabViewValue: 'walletList',
  setSelectTabValue: (tab: string) => set({ selectTabValue: tab }),
  setSelectTabViewValue: (view: string) => set({ selectTabViewValue: view }),
}));

export default useWalletTabValue;
