import React, { createContext, useState } from 'react';
import { ParameterHoltrop } from '../../src/interface/ParameterHoltrop';
import { ResultCalculate } from '../../src/interface/ResultCalculate';
import { ResultPower } from '../../src/interface/ResultPower';

// Buat konteks
interface MyContextProps {
  dataResultCalculate: ResultCalculate[] | undefined;
  setDataResultCalculate: React.Dispatch<React.SetStateAction<ResultCalculate[]>>;
  dataResultCalculate2: ResultCalculate[] | undefined;
  setDataResultCalculate2: React.Dispatch<React.SetStateAction<ResultCalculate[]>>;
  dataParameterHoltrop: ParameterHoltrop[] | undefined;
  setDataParameterHoltrop: React.Dispatch<React.SetStateAction<ParameterHoltrop[]>>;
  dataParameterHoltrop2: ParameterHoltrop[] | undefined;
  setDataParameterHoltrop2: React.Dispatch<React.SetStateAction<ParameterHoltrop[]>>;
  power: ResultPower[] | undefined;
  setPower: React.Dispatch<React.SetStateAction<ResultPower[]>>;
  power2: ResultPower[] | undefined;
  setPower2: React.Dispatch<React.SetStateAction<ResultPower[]>>;
}


export const MyContext = createContext<MyContextProps | undefined>(undefined);

interface MyContextProviderProps {
  children: React.ReactNode;
}


// Buat provider untuk konteks
const MyContextProvider: React.FC<MyContextProviderProps> = ({ children }) => {
  const [dataResultCalculate, setDataResultCalculate] = useState<ResultCalculate[]>([]);
  const [dataResultCalculate2, setDataResultCalculate2] = useState<ResultCalculate[]>([]);
  const [dataParameterHoltrop, setDataParameterHoltrop] = useState<ParameterHoltrop[]>([]);
  const [dataParameterHoltrop2, setDataParameterHoltrop2] = useState<ParameterHoltrop[]>([]);
  const [power, setPower] = useState<ResultPower[]>([]);
  const [power2, setPower2] = useState<ResultPower[]>([]);
  

  return (
    <MyContext.Provider value={{
      dataResultCalculate,
      setDataResultCalculate,
      dataResultCalculate2,
      setDataResultCalculate2,
      dataParameterHoltrop,
      setDataParameterHoltrop,
      dataParameterHoltrop2,
      setDataParameterHoltrop2,
      power,
      setPower,
      power2,
      setPower2
    }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyContextProvider;