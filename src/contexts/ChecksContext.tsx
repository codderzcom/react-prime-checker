import React, {createContext, useContext, useState} from 'react';
import type {CheckResult} from '@/types';

interface ChecksContextType {
  checks: CheckResult[];
  addCheck: (check: CheckResult) => void;
  setChecks: (checks: CheckResult[]) => void;
}

const ChecksContext = createContext<ChecksContextType | undefined>(undefined);

export const ChecksProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
  const [checks, setChecks] = useState<CheckResult[]>([]);

  const addCheck = (newCheck: CheckResult) => {
    setChecks(prev => [newCheck, ...prev]);
  };

  return (
    <ChecksContext.Provider value={{checks, addCheck, setChecks}}>
      {children}
    </ChecksContext.Provider>
  );
};

export const useChecks = () => {
  const context = useContext(ChecksContext);
  if (!context) {
    throw new Error('useChecks must be used within a ChecksProvider');
  }
  return context;
};