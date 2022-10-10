import React, { createContext, useReducer, useMemo } from 'react';
import reducer from '../configs/store/reducer';
import { UserStore, StoreAction } from '../configs/store/types';

type ProviderProps = {
  store: UserStore;
  children: React.ReactNode;
};

type ContextType = { state: UserStore; dispatch: React.Dispatch<StoreAction> };

const AuthContext = createContext<ContextType>({} as ContextType);

export function AuthProvider({ store, children }: ProviderProps) {
  const [state, dispatch] = useReducer(reducer, store);
  const cachedState = useMemo(() => ({ state, dispatch }), [state]);
  return (
    <AuthContext.Provider value={cachedState}>{children}</AuthContext.Provider>
  );
}
export default AuthContext;