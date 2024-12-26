// src/types/uview-plus.d.ts
declare module "@/uni_modules/uview-plus" {
  import { AxiosInstance } from "axios";
  import { ToastOptions } from "uview-plus";

  const http: AxiosInstance;
  const toast: (options: ToastOptions) => void;
  const route: uni.$u.route;
  const debounce: uni.$u.debounce;

  export { http, toast, route, debounce };
}
