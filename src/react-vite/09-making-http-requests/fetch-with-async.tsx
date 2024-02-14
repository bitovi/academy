import { useEffect, useState } from 'react';

function DataFetcher() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://api.example.com/data');
                setData(response.json());
            } catch (error) {
                // Error should be shown to the user
                console.error('Error fetching data:', error)
            }
        };

        fetchData();
    }, []);

    return (
        <p>{data}</p>
    );
}

export default DataFetcher;
