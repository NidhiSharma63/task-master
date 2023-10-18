import { ReactNode, createContext, useContext, useState } from 'react';

interface IPageContextComp {
  children: ReactNode;
}

interface IPageData {
  content: string;
  name: string;
  userId: string;
  __v: number;
  _id: string;
}

interface IContext {
  pageData: IPageData;
  setPageData: React.Dispatch<React.SetStateAction<IPageData>>;
}

const PagesContext = createContext<IContext>({
  pageData: {} as IPageData,
  setPageData: () => {},
});

const PagesContextComp = ({ children }: IPageContextComp) => {
  const [pageData, setPageData] = useState<IPageData>({} as IPageData);

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
