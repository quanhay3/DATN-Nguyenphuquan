import { useEffect, useState } from 'react';

function useDebounce(value, delay) {
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
        let event = setTimeout(() => {
            setDebounceValue(value);
        }, delay);

        return () => clearTimeout(event);
        // eslint-disable-next-line
    }, [value]);

    return debounceValue;
}

export default useDebounce;