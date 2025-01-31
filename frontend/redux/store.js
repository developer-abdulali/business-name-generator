// import { configureStore } from "@reduxjs/toolkit";
// import authSlice from "./slices/authSlice";
// import jobSlice from "./slices/jobSlice";

// const store = configureStore({
//   reducer: {
//     auth: authSlice,
//     job: jobSlice,
//   },
// });

// export default store;

import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import authSlice from "./slices/authSlice";
import jobSlice from "./slices/jobSlice";
import companySlice from "./slices/companySlice";

const authPersistConfig = {
  key: "auth",
  storage,
};

const jobPersistConfig = {
  key: "job",
  storage,
};

const companyPersistConfig = {
  key: "company",
  storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authSlice);
const persistedJobReducer = persistReducer(jobPersistConfig, jobSlice);
const persistedCompanyReducer = persistReducer(
  companyPersistConfig,
  companySlice
);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    job: persistedJobReducer,
    company: persistedCompanyReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for redux-persist
    }),
});

const persistor = persistStore(store);

export { store, persistor };
