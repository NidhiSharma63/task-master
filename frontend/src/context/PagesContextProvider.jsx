import { createContext, useContext, useState } from "react";

const PagesContext = createContext();

const PagesContextComp = ({ children }) => {
  const [value, setValue] = useState([]);

  return <PagesContext.Provider value={{ value, setValue }}>{children}</PagesContext.Provider>;
};

export default PagesContextComp;

// Create a custom hook to access the context
export const usePagesContext = () => {
  return useContext(PagesContext);
};
