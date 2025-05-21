import React, { createContext, useReducer, type ReactNode, useContext } from 'react';
import type { Company } from '../api/mockApi';

type State = {
    currentCompany: Company | null;
};

type Action = { type: 'SET_COMPANY'; payload: Company };

const initialState: State = {
    currentCompany: null,
};

const AppContext = createContext<{ state: State; dispatch: React.Dispatch<Action> } | undefined>(undefined);

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'SET_COMPANY':
            return { ...state, currentCompany: action.payload };
        default:
            return state;
    }
}

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within AppProvider');
    }
    return context;
};