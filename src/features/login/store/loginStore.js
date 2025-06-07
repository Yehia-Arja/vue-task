import { defineStore } from "pinia";
import { login, verifyCode } from "../services/login";

const useLoginStore = defineStore('Login', {
  state: () => ({
    email: "",
    error: null,
    loading: false,
  }),
  actions: {
    async login(email) {
      this.loading = true;
      this.error = null;
      try {
        const res = await login(email);
        this.email = email;
        return res;
      } catch (error) {
        this.error = error?.message || "Login failed";
      } finally {
        this.loading = false;
      }
    },
    async verifyCode(code) {
      this.loading = true;
      this.error = null;
      try {
        const res = await verifyCode(this.email, code);
        return res;
      } catch (error) {
        this.error = error?.message || "Verification failed";
      } finally {
        this.loading = false;
      }
    }
  }
});

export default useLoginStore;
