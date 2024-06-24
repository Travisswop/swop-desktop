import { create } from "zustand";

const useSmartsiteFormStore = create((set) => ({
  formData: {
    name: "",
    bio: "",
    profileImg: "",
    backgroundImg: "",
    theme: "",
    galleryImg: "",
  },
  setFormData: (field: any, value: any) =>
    set((state: any) => ({
      formData: {
        ...state.formData,
        [field]: value,
      },
    })),
}));

export default useSmartsiteFormStore;
