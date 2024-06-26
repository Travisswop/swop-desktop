import { create } from "zustand";

const useLoggedInUserStore = create((set) => ({
  state: {},
  setState: (data: any) =>
    set((state: any) => ({
      ...state,
      ...data,
    })),
}));

export default useLoggedInUserStore;
