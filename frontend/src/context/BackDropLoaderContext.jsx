import { createContext, useContext, useState } from "react";

const BackDropLoaderContext = createContext();

const BackDropLoaderContextComp = ({ children }) => {
  const [value, setValue] = useState("Default Value");

  return (
    <BackDropLoaderContext.Provider value={{ value, setValue }}>
      {children}
    </BackDropLoaderContext.Provider>
  );
};

export default BackDropLoaderContextComp;

// Create a custom hook to access the context
export const useBackDropLoaderContext = () => {
  return useContext(BackDropLoaderContext);
};
