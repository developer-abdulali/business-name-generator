"use client";
import Navbar from "@/components/shared/Navbar";
import store from "@/redux/store";
import { Provider } from "react-redux";
import { Toaster } from "sonner";

export default function ClientProvider({ children }) {
  return (
    <>
      <Provider store={store}>
        <Toaster />
        <Navbar />
        {children}
      </Provider>
    </>
  );
}
