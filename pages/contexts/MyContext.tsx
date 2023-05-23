import React, { createContext, useState } from 'react';

interface ParameterHoltrop {
  name: string,
  value: number,
  status: string
}

interface ResultCalculate {
  knot: number,
  ms: number,
  rn: number,
  cf: number,
  rf: number
  k1: number,
  rapp: number,
  fn: number,
  m2: number,
  rw: number,
  fni: number,
  rb: number,
  fnt:number,
  c6: number,
  rtr: number,
  ra: number,
  rt: number,
  RAf: number,
  seaMargin: number
}

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