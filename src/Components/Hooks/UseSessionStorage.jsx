import { useState } from 'react';

export const useSessionStorage = (keyName, defaultValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const value = window.sessionStorage.getItem(keyName);

            if (value) {
                return JSON.parse(value);
            } else {
                window.sessionStorage.setItem(keyName, JSON.stringify(defaultValue));
                return defaultValue;
            }
        } catch (err) {
            console.error(err);
            return defaultValue;
        }
    });

    const setValue = (newValue) => {
        try {
            window.sessionStorage.setItem(keyName, JSON.stringify(newValue));
        } catch (err) {
            console.error(err);
        }
        setStoredValue(newValue);
    };

    const removeItem = (keyName) => {
        try {
            window.sessionStorage.removeItem(keyName);
        } catch (err) {
            console.error(err);
        }
    };

    return [storedValue, setValue, removeItem];
};
