// "use client";

// import Footer from "@/components/Footer";
// import Navbar from "@/components/shared/Navbar";
// import { PersistGate } from "redux-persist/integration/react";
// import { store, persistor } from "@/redux/store";
// import { Provider } from "react-redux";
// import { Toaster } from "sonner";
// import { usePathname } from "next/navigation";

// export default function ClientProvider({ children }) {
//   const pathname = usePathname();

//   // Pages where the Navbar should be hidden
//   const hideNavbarOn = ["/login", "/signup"];
//   const shouldHideNavbar = hideNavbarOn.includes(pathname);

//   return (
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persistor}>
//         {!shouldHideNavbar && <Navbar />}
//         {children}
//         <Footer />
//       </PersistGate>
//       <Toaster />
//     </Provider>
//   );
// }

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
      <PersistGate
        loading={
          <div className="flex items-center justify-center min-h-screen">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-customColor rounded-full animate-spin"></div>
          </div>
        }
        persistor={persistor}
      >
        {!shouldHideNavbar && <Navbar />}
        {children}
        <Footer />
      </PersistGate>
      <Toaster />
    </Provider>
  );
}
