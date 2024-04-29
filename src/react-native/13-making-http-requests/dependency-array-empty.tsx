import { useEffect, useState } from 'react';

const GeolocationComponent: React.FC = () => {
    const [location, setLocation] = useState(null);

    useEffect(() => { // Effect callback function
        navigator.geolocation.getCurrentPosition(position => {
            setLocation(position.coords);
        }, (error) => {
            console.error(error);
        });
    }, []); // Dependency array

    return (
        <main>
            {location ? (
                <p>
                    Latitude: {location.latitude},
                    Longitude: {location.longitude}
                </p>
            ) : (
                <p>Requesting location…</p>
            )}
        </main>
    );
}

export default GeolocationComponent;
