import http from "@/api/http";
import { User } from "@/vite-env";
import { create } from "zustand";
import Cookies from "js-cookie";

interface UserState {
  user: User | null;
  loading: boolean;
  error: Error | null | unknown;
  getUser: () => Promise<void>;
  logout: () => Promise<void>;
}

const userStore = create<UserState>((set) => ({
  user: null,
  loading: false,
  error: null,
  logout: async () => {
    set({ loading: true });
    try {
      await http.get("auth/logout");
      Cookies.remove("token");
      set({ user: null, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },
  getUser: async () => {
    set({ loading: true });
    try {
      const { data } = await http.get("users/me");
      set({ user: data, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },
}));

export default userStore;
