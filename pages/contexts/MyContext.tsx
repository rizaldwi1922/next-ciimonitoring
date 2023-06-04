import React, { createContext, useState } from 'react';
import { ParameterHoltrop } from '../../src/interface/ParameterHoltrop';
import { ResultCalculate } from '../../src/interface/ResultCalculate';

// Buat konteks
interface MyContextProps {
  dataResultCalculate: ResultCalculate[] | undefined;
  setDataResultCalculate: React.Dispatch<React.SetStateAction<ResultCalculate[]>>;
  dataResultCalculate2: ResultCalculate[] | undefined;
  setDataResultCalculate2: React.Dispatch<React.SetStateAction<ResultCalculate[]>>;
  dataParameterHoltrop: ParameterHoltrop[] | undefined;
  setDataParameterHoltrop: React.Dispatch<React.SetStateAction<ParameterHoltrop[]>>;
  RCorrect: interfaceRcorrect | undefined;
  setRCorrect:  React.Dispatch<React.SetStateAction<interfaceRcorrect>>;
}

export const MyContext = createContext<MyContextProps | undefined>(undefined);

interface MyContextProviderProps {
  children: React.ReactNode;
}
type interfaceRcorrect = number[];


// Buat provider untuk konteks
const MyContextProvider: React.FC<MyContextProviderProps> = ({ children }) => {
  const [dataResultCalculate, setDataResultCalculate] = useState<ResultCalculate[]>([]);
  const [dataResultCalculate2, setDataResultCalculate2] = useState<ResultCalculate[]>([]);
  const [dataParameterHoltrop, setDataParameterHoltrop] = useState<ParameterHoltrop[]>([]);
  const [RCorrect, setRCorrect] = useState<interfaceRcorrect>([]);
  

  return (
    <MyContext.Provider value={{
      dataResultCalculate,
      setDataResultCalculate,
      dataResultCalculate2,
      setDataResultCalculate2,
      dataParameterHoltrop,
      setDataParameterHoltrop,
      RCorrect,
      setRCorrect
    }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyContextProvider;