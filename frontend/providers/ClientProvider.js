"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/shared/Navbar";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/redux/store";
import { Provider } from "react-redux";
import { Toaster } from "sonner";
import { usePathname } from "next/navigation";

export default function ClientProvider({ children }) {
  const pathname = usePathname();

  // Pages where the Navbar should be hidden
  const hideNavbarOn = ["/login", "/signup"];
  const shouldHideNavbar = hideNavbarOn.includes(pathname);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {!shouldHideNavbar && <Navbar />}
        {children}
        <Footer />
      </PersistGate>
      <Toaster />
    </Provider>
  );
}
