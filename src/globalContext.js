import React, { createContext, useReducer } from 'react';

const initialState = {
    user: {
        username: null,
        fullname: null,
        email: null,
        ativo: false
    },
    isCheckingAuth: true,
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'reset':
            return initialState
        case 'setUser':
            return { ...state, user: action.payload, isCheckingAuth: false }
        case 'isCheckingAuth':
            return { ...state, isCheckingAuth: action.payload }
        default:
            return state
    }
}

const GlobalContext = createContext(initialState)
const GlobalContextProvider = props => <GlobalContext.Provider value={useReducer(reducer, initialState)}>{props.children}</GlobalContext.Provider>

export { GlobalContext, GlobalContextProvider }