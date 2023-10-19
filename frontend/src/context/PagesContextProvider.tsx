import { ReactNode, createContext, useContext, useState } from 'react';
import { IPage } from 'src/common/Interface/Interface';

interface IPageContextComp {
  children: ReactNode;
}

interface IContext {
  pageData: IPage | {};
  setPageData: React.Dispatch<React.SetStateAction<IPage | {}>>;
}

const PagesContext = createContext<IContext>({
  pageData: {},
  setPageData: () => {},
});

const PagesContextComp = ({ children }: IPageContextComp) => {
  const [pageData, setPageData] = useState<IPage | {}>({});

  return (
    <PagesContext.Provider value={{ pageData, setPageData }}>
      {children}
    </PagesContext.Provider>
  );
};

export default PagesContextComp;

// Create a custom hook to access the context
export const usePagesContext = () => {
  return useContext(PagesContext);
};
