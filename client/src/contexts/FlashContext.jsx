import { createContext, useContext, useState, useCallback } from 'react';

const FlashContext = createContext();

export const FlashProvider = ({ children }) => {
    const [message, setMessage] = useState(null);
    const [type, setType] = useState('error');

    const showFlash = useCallback((msg, msgType = 'error') => {
        setMessage(msg);
        setType(msgType);
        setTimeout(() => setMessage(null), 4000);
    }, []);

    return (
        <FlashContext.Provider value={{ message, type, showFlash }}>
            {children}
        </FlashContext.Provider>
    );
};

export const useFlash = () => useContext(FlashContext);
