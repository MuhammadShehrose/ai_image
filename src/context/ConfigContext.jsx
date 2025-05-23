import React, { createContext, useContext, useEffect, useState } from "react";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const ConfigContext = createContext();

export const useConfig = () => useContext(ConfigContext);

export const ConfigProvider = ({ children }) => {
     const [config, setConfig] = useState({ api_url: "", api_key: "", api_host: "" });

     useEffect(() => {
          const fetchConfig = async () => {
               const db = getFirestore();
               const configRef = doc(db, "configurations", "api_settings");
               const snapshot = await getDoc(configRef);
               if (snapshot.exists()) setConfig(snapshot.data());
          };
          fetchConfig();
     }, []);

     const updateConfig = async (newConfig) => {
          const db = getFirestore();
          const configRef = doc(db, "configurations", "api_settings");
          await setDoc(configRef, newConfig);
          setConfig(newConfig);
     };

     return (
          <ConfigContext.Provider value={{ config, updateConfig }}>
               {children}
          </ConfigContext.Provider>
     );
};
