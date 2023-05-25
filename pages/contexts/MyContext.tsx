import React, { createContext, useState } from 'react';
import { ParameterHoltrop } from '../../src/interface/ParameterHoltrop';
import { ResultCalculate } from '../../src/interface/ResultCalculate';

// Buat konteks
interface MyContextProps {
  dataResultCalculate: ResultCalculate[] | undefined;
  setDataResultCalculate: React.Dispatch<React.SetStateAction<ResultCalculate[]>>;
  dataParameterHoltrop: ParameterHoltrop[] | undefined;
  setDataParameterHoltrop: React.Dispatch<React.SetStateAction<ParameterHoltrop[]>>;
}

export const MyContext = createContext<MyContextProps | undefined>(undefined);

interface MyContextProviderProps {
  children: React.ReactNode;
}

// Buat provider untuk konteks
const MyContextProvider: React.FC<MyContextProviderProps> = ({ children }) => {
  const [dataResultCalculate, setDataResultCalculate] = useState<ResultCalculate[]>([]);
  const [dataParameterHoltrop, setDataParameterHoltrop] = useState<ParameterHoltrop[]>([]);
  

  return (
    <MyContext.Provider value={{
      dataResultCalculate,
      setDataResultCalculate,
      dataParameterHoltrop,
      setDataParameterHoltrop
    }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyContextProvider;