import { createContext, useState } from "react";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [clickedLocations, setClickedLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlanifyPage, setIsPlanifyPage] = useState(true);

  return (
    <GlobalContext.Provider
      value={{
        clickedLocations,
        setClickedLocations,
        isPlanifyPage,
        setIsPlanifyPage,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
