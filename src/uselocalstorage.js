import { useState, useEffect } from 'react';
import axios from 'axios';

export default (key, initialValue) => {

    const localValue = window.localStorage.getItem(key);
    const [storedValue, setStoredValue] = useState(localValue ? JSON.parse(localValue) : initialValue);

    const setValue = (value) => {
        setStoredValue(value);
        window.localStorage.setItem(key, JSON.stringify(value));
    }

    useEffect(() => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        axios.post(`https://kvdb.io/2bpdcqZNqenyfwq1eRsVeS/${key}`, storedValue, {cancelToken: source.token})
        .catch((error) => {
            console.log(error);
        });

        return () => {
            source.cancel('Operation canceled by the user.');
        }
    });

    return [storedValue, setValue];
}