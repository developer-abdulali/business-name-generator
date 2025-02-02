import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "./slices/authSlice";
import jobSlice from "./slices/jobSlice";
import companySlice from "./slices/companySlice";
import applicationSlice from "./slices/applicationSlice";

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

const applicationPersistConfig = {
  key: "application",
  storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authSlice);
const persistedJobReducer = persistReducer(jobPersistConfig, jobSlice);
const persistedCompanyReducer = persistReducer(
  companyPersistConfig,
  companySlice
);
const persistedApplicationReducer = persistReducer(
  applicationPersistConfig,
  applicationSlice
);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    job: persistedJobReducer,
    company: persistedCompanyReducer,
    application: persistedApplicationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for redux-persist
    }),
});

const persistor = persistStore(store);

export { store, persistor };
