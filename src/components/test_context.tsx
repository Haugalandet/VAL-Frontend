import { createContext, useContext, useState } from "react";
import { defaultTest } from "../utils/funcs";

const TestContext = createContext(defaultTest());

export const useTest = () => {
  return useContext(TestContext);
};

// @ts-ignore
export const TestProvider = ({ children }) => {
  const [test, setTest] = useState(defaultTest());

  const updateTest = (newTestData: Boolean) => {
    setTest(newTestData);
  };

  return <TestContext.Provider value={test}>{children}</TestContext.Provider>;
};
