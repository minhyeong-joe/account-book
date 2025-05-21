import { createContext, useContext, useEffect, useState } from 'react';

import { getPaymentMethodTypes } from '../apis/paymentMethods';


const PaymentMethodTypesContext = createContext(null);

export const PaymentMethodTypesProvider = ({ children }) => {
    const [types, setTypes] = useState([]);

    useEffect(() => {
        const fetchPaymentMethodTypes = async () => {
            try {
                const paymentMethodTypes = await getPaymentMethodTypes();
                setTypes(paymentMethodTypes);
            } catch (error) {
                console.error('Error fetching payment method types:', error);
            }
        };
        fetchPaymentMethodTypes();
    }, []);

    return (
        <PaymentMethodTypesContext.Provider value={types}>
            {children}
        </PaymentMethodTypesContext.Provider>
    );
};

export const usePaymentMethodTypes = () => useContext(PaymentMethodTypesContext);
