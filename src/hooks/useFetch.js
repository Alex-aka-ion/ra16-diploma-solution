import {useEffect, useRef, useState} from "react";

export default function useFetch(url, initialData, lazyLoading = false, offset = 0) {
    const [data, setData] = useState(initialData);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [finish, setFinish] = useState(false);
    const timestampRef = useRef();
    const prevData = useRef("DATA");

    prevData.current = Array.isArray(data) && [...data];
    console.log('prevData', prevData.current);

    useEffect(() => {

        const fetchData = async () => {

            const timestamp = Date.now();
            timestampRef.current = timestamp;
            setFinish(false);
            setLoading(true);
            try {
                setError(null);
                console.log(url);

                const response = await fetch(process.env.REACT_APP_API_URL + url);
                const data = await response.json();

                console.log('prev data', prevData.current);
                console.log('offset', offset);
                console.log('data.lenght', data.length);

                if (timestampRef.current === timestamp) {
                    if (Array.isArray(data) && data.length < 6) {
                        setFinish(true);
                    }

                    if (lazyLoading && offset && prevData.current.length) {
                        console.log('lazy data', data);
                        setData([...prevData.current, ...data]);
                    } else {
                        setData(data);
                    }
                }
            } catch (e) {
                setError(e);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url, lazyLoading, offset]);

    return [data, loading, error, finish];
}
