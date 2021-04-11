import {useEffect, useRef, useState} from "react";

export default function useFetch(url, initialData, lazyLoading = false, offset = 0, step) {
    const [data, setData] = useState(initialData);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [finish, setFinish] = useState(false);
    const timestampRef = useRef();
    const prevData = useRef("DATA");

    prevData.current = Array.isArray(data) && [...data];

    useEffect(() => {

        const fetchData = async () => {

            const timestamp = Date.now();
            timestampRef.current = timestamp;
            setFinish(false);
            setLoading(true);
            try {
                setError(null);

                const response = await fetch(process.env.REACT_APP_API_URL + url);
                if (!response.ok) {
                    throw new Error(response.status + ' ' + response.statusText);
                }
                const data = await response.json();

                if (timestampRef.current === timestamp) {
                    if (Array.isArray(data) && data.length < step) {
                        setFinish(true);
                    }

                    if (lazyLoading && offset && prevData.current.length) {
                        setData([...prevData.current, ...data]);
                    } else {
                        setData(data);
                    }
                }
            } catch (e) {
                setError(e.toString());
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url, lazyLoading, offset, step]);

    return [data, loading, error, finish];
}
