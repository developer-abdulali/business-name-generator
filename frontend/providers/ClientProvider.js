"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/shared/Navbar";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/redux/store";
import { Provider } from "react-redux";
import { Toaster } from "sonner";

export default function ClientProvider({ children }) {
  return (
    <>
      {/* <Provider store={store}> */}
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Toaster />
          <Navbar />
          {children}
          <Footer />
        </PersistGate>
      </Provider>
    </>
  );
}
